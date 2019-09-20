import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authenticate from '../auth/authenticate-middleware';
import authRouter from '../auth/auth-router';
import jokesRouter from '../jokes/jokes-router';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

export default server;
