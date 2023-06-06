import db from './index.ts';
import { SignupToken } from '../models/signup_token.ts';

export const dbVerifyEmail = async (email: string): Promise<number | null> => {
  const users = await db('users').where({ email }).update({ emailVerified: true }, ['id']);
  if (!users) {
    return null;
  }
  return users[0].id;
};

export const dbInsertSignupToken = async (email: string, token: string): Promise<void> => {
  await db('signup_tokens').returning('id').insert({ email, token });
};

export const dbFetchSignupToken = async (email: string, token: string): Promise<SignupToken | null> => {
  const t = await db
    .select('*')
    .where({
      email,
      token,
    })
    .from('signup_tokens')
    .first();

  if (!t) {
    return null;
  }
  return new SignupToken(t);
};
