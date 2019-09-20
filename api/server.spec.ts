/* eslint-disable no-undef */
import request from 'supertest';
import db from '../database/db-config';
import server from './server';

// Dummy users for testing purposes
const testUser = { username: 'test', password: 'test' };
const dummyUser = { username: 'dummy', password: 'dummy' };

// Initiate the migrations for the testing environment
beforeAll(async () => {
  await db.migrate.latest();
  await db.seed.run();
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
        .send(testUser)).body;
      const res = await request(server)
        .get('/api/jokes')
        .auth(token, { type: 'bearer' });
      expect(res.status).toBe(200);
    });
  });

  describe('login endpoint', () => {
    it('should return JSON', async () => {
      const res = await request(server)
        .post('/api/login')
        .send(testUser);
      expect(res.type).toMatch(/json/i);
    });

    it('should receive a 200 OK on valid login', async () => {
      const res = await request(server)
        .post('/api/login')
        .send(testUser);
      expect(res.status).toBe(200);
    });
  });

  describe('register endpoint', () => {
    it('should add user to database', async () => {
      const res = await request(server)
        .post('/api/register')
        .send(dummyUser);
      expect(res.status).toBe(200);
      const results = await db('users');
      expect(results).toHaveLength(2);
    });

    it('should fail on invalid entry', async () => {
      const res = await request(server)
        .post('/api/register')
        .send({ username: 'nopassword' });
      expect(res.status).toBe(400);
    });
  });
});
