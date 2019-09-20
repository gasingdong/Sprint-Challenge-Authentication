import { Request, Response } from 'express';

/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

export default (req: Request, res: Response): void => {
  res.status(401).json({ you: 'shall not pass!' });
};
