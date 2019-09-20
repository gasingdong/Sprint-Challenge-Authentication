/* eslint-disable no-undef */
import request from 'supertest';
import db from '../database/db-config';
import server from './server';

// Initiate the migrations for the testing environment
beforeAll(async () => {
  await db.migrate.latest();
});

describe('server.js', () => {
  // Delete the table contents before each test
  beforeEach(async () => {
    await db('users').truncate();
  });

  it('should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

  describe('jokes endpoint', () => {
    it('returns 401 FORBIDDEN before logging in', async () => {
      const res = await request(server).get('/api/jokes');
      expect(res.status).toBe(401);
    });

    it('returns 200 OK after logging in', async () => {
      const { token } = (await request(server)
        .post('/api/login')
        .send({ username: 'admin', password: 'admin' })).body;
      const res = await request(server)
        .get('/api/jokes')
        .auth(token, { type: 'bearer' });
      expect(res.status).toBe(200);
    });
  });
});
