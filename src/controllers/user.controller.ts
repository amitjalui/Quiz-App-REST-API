import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

interface ReturnreqResonse {
  status: "success" | "error",
  message: String,
  data: {}
}

let reqRes: ReturnreqResonse;

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await new User(req.body).save();

    if (!user) {
      reqRes = { status: "error", message: "No result found", data: {} };
      return res.send(reqRes);
    }
    
    reqRes = {status: "success", message: "Registration done", data: {userId: user._id}};
    return res.send(reqRes);
  } catch (error) {
    reqRes = {status: "error", message: "Something went wrong", data: {}};
    return res.status(500).send(reqRes);
  }
}

const getUser = async(req: Request, res:  Response) => {
  console.log('change')
  try {
    const userId = req.params.userId;

    /*
      @MongoDB_Projection 
      * Allows which data needed to be show and which not
      e.g. (userId,{name: 1, email: 1, _id: 0})
    */
    const user = await User.findById(userId, {name: 1, email: 1});  

    if (!user) {
      reqRes = {status: "error", message: "No user found", data: {}};
      return res.send(reqRes);
    } else {
      reqRes = {status: "success", message: "User found", data: {user: user}};
      return res.send(reqRes);
    }
  } catch (error) {
    reqRes = {status: "error", message: "Something went wrong", data: {}};
    return res.status(500).send(reqRes);
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.body._id;
    const user = await User.findById(userId);

    if (user) {
      user.name = req.body.name;
      await user.save();
      reqRes = {status: "success", message: "User updated", data: {}};
      return res.send(reqRes);
    }
    
  } catch (error) {
    reqRes = {status: "error", message: "Something went wrong", data: {}};
    return res.status(500).send(reqRes);
  }

}

export { registerUser, getUser, updateUser };