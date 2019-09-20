/* eslint-disable no-undef */
import request from 'supertest';
import db from '../database/db-config';
import server from './server';

beforeAll(async () => {
  await db.migrate.latest();
});

describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});
