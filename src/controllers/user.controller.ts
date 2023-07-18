import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

interface ReturnreqResonse {
  status: "success" | "error",
  message: String,
  data: {}
}

let reqRes: ReturnreqResonse;

const registerUser = async (req: Request, res: Response) => {
  try {
    const {email, name} = req.body;
    const password = await bcrypt.hash(req.body.password, 12);
    
    const user = await new User({email, name, password}).save();

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

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const password = req.body.password;

    // find user with email
    const user = await User.findOne({email});

    if (!user) {
      reqRes = { status: "error", message: "No user exist", data: {} };
      res.status(401).send(reqRes);
    } else {
      // verify password
      // .compare(string, hash)
      const comparePassword = await bcrypt.compare(password, user.password);
      
      // then decide
      if (comparePassword) {
        reqRes = { status: "success", message: "Logged in", data: {} };
        return res.status(200).send(reqRes);
      } else {
        reqRes = { status: "error", message: "Invalid Credentials", data: {} };
        return res.status(401).send(reqRes);
      }
    }
  } catch (error) {
    reqRes = {status: "error", message: "Something went wrong", data: {}};
    return res.status(500).send(reqRes);
  }
}

const getUser = async(req: Request, res:  Response) => {
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

export { registerUser, getUser, updateUser, loginUser };