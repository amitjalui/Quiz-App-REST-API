import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ProjectError from '../helper/error';

interface ReturnreqResonse {
  status: "success" | "error",
  message: String,
  data: {} | []
}

let reqRes: ReturnreqResonse;

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email, name} = req.body;
    const password = await bcrypt.hash(req.body.password, 12);

    const userExist = await User.findOne({email});

    if (userExist) {
      reqRes = { status: "error", message: "User with same email id already exist", data: {} };
      return res.send(reqRes);
    } else {
      const user = await new User({email, name, password}).save();

      if (!user) {
        reqRes = { status: "error", message: "No result found", data: {} };
        return res.send(reqRes);
      }

      reqRes = {status: "success", message: "Registration done", data: {userId: user._id}};
      return res.send(reqRes);
    }
    
  } catch (error) {
    next(error);
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const password = req.body.password;

    // find user with email
    const user = await User.findOne({email});

    if (!user) {
      const err = new ProjectError("No user exist");
      err.statusCode = 401;
      throw err;
    } else {
      // verify password
      // .compare(string, hash)
      const comparePassword = await bcrypt.compare(password, user.password);
      
      // then decide
      if (comparePassword) {
        const token = jwt.sign({userId: user._id}, "mytemporarysecretkey", {expiresIn: '1h'});
        
        reqRes = { status: "success", message: "Logged in", data: {token} };
        return res.status(200).send(reqRes);
      } else {
        const err = new ProjectError("Invalid Credentials");
        err.statusCode = 401;
        throw err;
      }
    }
  } catch (error) {
    next(error);
  }
}

export { registerUser, loginUser };