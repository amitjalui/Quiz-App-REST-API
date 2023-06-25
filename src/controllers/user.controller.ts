import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await new User(req.body).save();

  console.log("Register Done");
  res.send("Register Done");
}

export { registerUser };