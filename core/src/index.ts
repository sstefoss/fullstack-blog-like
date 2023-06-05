import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import * as http from 'http';

import { dbVerifyEmail, dbFetchSignupToken, dbInsertSignupToken } from './db/auth.ts';
import { dbFetchUserByEmail, dbFetchUser, dbInsertUser } from './db/user.ts';

const privateKey = fs.readFileSync(path.join(path.resolve('.'), 'private.key'));
const publicKey = fs.readFileSync(path.join(path.resolve('.'), 'public.pem'));

const typeDefs = `#graphql
  type User {
    id: Int
    email: String
  }

  type Query {
    me: User!
  }

  type Mutation {
    signup(email: String, password: String): TokenPayload!
    verifyEmail(email: String, token: String): TokenPayload!
    login(email: String, password: String): TokenPayload!
  }

  type TokenPayload {
    token: String
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    me: async (_: any, _args: any, ctx: any) => {
      if (ctx.userId) {
        const user = await dbFetchUser(ctx.userId);
        return { ...user };
      } else {
        throw new Error('Not logged in.');
      }
    },
  },
  Mutation: {
    signup: async (_: any, data: { email: string; password: string }) => {
      const { email, password } = data;
      const token = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);

      // check if user is already in database
      const user = await dbFetchUserByEmail(email);
      if (user !== null) {
        throw new Error('user_exists');
      }

      // store token and return it
      dbInsertUser(email, hashedPassword);
      dbInsertSignupToken(email, token);

      if (!token) throw new Error('Something went wrong :(');
      return { token };
    },
    verifyEmail: async (_: any, data: { email: string; token: string }) => {
      const { email, token } = data;
      const signupToken = await dbFetchSignupToken(email, token);
      if (!signupToken) throw new Error('no_such_token');

      const expirationDate = new Date(signupToken.expirationAt);
      if (expirationDate < new Date()) {
        throw new Error('Token expired.');
      }

      const userId = await dbVerifyEmail(email);
      if (!userId) {
        throw new Error('User email not found.');
      }
      const jwtToken = signJWT(userId, 'user');
      return { token: jwtToken };
    },
    login: async (_: any, data: { email: string; password: string }) => {
      const { email, password } = data;
      const user = await dbFetchUserByEmail(email);

      if (!user) throw new Error('no_such_user');

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('password_invalid');
      }
      const token = signJWT(user.id, 'user');
      return { token };
    },
  },
};

const signJWT = (userId: number, role: string) =>
  jwt.sign(
    {
      userId,
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': [role],
        'x-hasura-default-role': role,
        'x-hasura-user-id': `${userId}`,
      },
    },
    privateKey,
    { algorithm: 'RS256' },
  );

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface Req {
  req: http.IncomingMessage;
}
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: Req) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return {
        userId: null,
      };
    }

    const token = authorization.replace('Bearer ', '');
    const verifiedToken = jwt.verify(token, publicKey, {
      algorithms: ['RS256'],
    }) as any;
    const userId = Array.isArray(verifiedToken.userId) ? verifiedToken.userId[0].id : verifiedToken.userId;
    return { userId };
  },
});

console.log(`🚀 Server listening at: ${url}`);
