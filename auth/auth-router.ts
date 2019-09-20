import { Request, Response } from 'express';

const router = require('express').Router();

router.post('/register', (req: Request, res: Response) => {
  // implement registration
});

router.post('/login', (req: Request, res: Response) => {
  // implement login
});

export default router;
