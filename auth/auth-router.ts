import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Users from '../users/user-model';
import Secrets from './config/secrets';
import { User } from '../users/types';

const router = require('express').Router();

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Ensure there's a body at all
  if (!req.body) {
    res.status(400).json({ error: 'No body.' });
    return;
  }

  const { username, password } = req.body;

  // Ensure there's both a username and password
  if (username && password) {
    const existingUser = await Users.getByUsername(username);

    if (!existingUser) {
      next();
    } else {
      res.status(400).json({ error: 'Username is already taken.' });
    }
  } else {
    res
      .status(400)
      .json({ error: 'You must provide both a username and password.' });
  }
};

const generateToken = (user: User): string => {
  const payload = {
    username: user.username,
  };
  const options = {
    expiresIn: '1d',
  };
  return jwt.sign(payload, Secrets.jwtSecret, options);
};

router.post(
  '/register',
  validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body;
      const password = bcryptjs.hashSync(req.body.password);
      const saved = await Users.add({ username, password });
      res.status(201).json(saved);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const user = await Users.getByUsername(username);
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ token });
        } else {
          res.status(401).json({ message: 'Invalid credentials.' });
        }
      } catch (err) {
        next(err);
      }
    } else {
      res
        .status(400)
        .json({ message: 'You need both a username and password.' });
    }
  }
);

export default router;
