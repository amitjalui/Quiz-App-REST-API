import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

interface ReturnResponse {
  status: "success" | "error",
  message: String,
  data: {}
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  let resp: ReturnResponse;
  
  try {
    const user = await new User(req.body).save();

    if (!user) {
      const resp = { status: "error", message: "No result found", data: {} };
      return res.json(resp);
    }
    
    resp = {status: "success", message: "Registration done", data: {userId: user._id}};
    return res.send(resp);
  } catch (error) {
    resp = {status: "error", message: "Something went wrong", data: {}};
    return res.status(500).json(resp);
  }
}

export { registerUser };