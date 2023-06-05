import db from './index.ts';
import { User } from '../models/user.ts';

export const dbInsertUser = async (email: string, hashedPass: string): Promise<void> => {
  await db('users').returning('id').insert({ email, password: hashedPass });
};

export const dbFetchUser = async (id: number): Promise<User | null> => {
  const u = await db
    .select('*')
    .from('users')
    .where({
      id,
    })
    .first();
  if (!u) {
    return null;
  }
  return new User(u);
};

export const dbFetchUserByEmail = async (email: string): Promise<User | null> => {
  const u = await db
    .select('*')
    .from('users')
    .where({
      email,
    })
    .first();
  if (!u) {
    return null;
  }
  return new User(u);
};
