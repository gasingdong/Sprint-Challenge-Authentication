import { QueryBuilder } from 'knex';
import db from '../database/db-config';
import { User } from './types';

const get = (): QueryBuilder => {
  return db('users');
};

const getByUsername = (username: string): QueryBuilder<{}, User> => {
  return db('users')
    .where({ username })
    .first<User>();
};

const add = (user: User): QueryBuilder => {
  return db('users').insert(user, 'id');
};

export default {
  get,
  getByUsername,
  add,
};
