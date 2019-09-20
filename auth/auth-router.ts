import { Request, Response, NextFunction } from 'express';
import Users from '../users/user-model';

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

router.use(validateUser);

router.post(
  '/register',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const saved = await Users.add({ username, password });
      res.status(200).json(saved);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/login', (req: Request, res: Response) => {
  // implement login
});

export default router;
