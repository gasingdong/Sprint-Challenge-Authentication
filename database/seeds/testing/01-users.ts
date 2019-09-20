import * as Knex from 'knex';

// eslint-disable-next-line import/prefer-default-export
export const seed = async (knex: Knex): Promise<void> => {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([{ username: 'test', password: 'test' }]);
    });
};
