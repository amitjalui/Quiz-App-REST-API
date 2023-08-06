import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ProjectError from "../helper/error";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      const err = new ProjectError("Not authenticated");  
      err.statusCode = 401;
      throw err;
    }

    // Decode token
    const token = authHeader.split(" ")[1];
    let decodeToken:{userId: String, int: Number, exp: Number};

    try {
      decodeToken = <any> jwt.verify(token, "mytemporarysecretkey");
    } catch (error) {
      const err = new ProjectError("Not authenticated");  
      err.statusCode = 401;
      throw err;
    }

    if (!decodeToken) {
      const err = new ProjectError("Not authenticated");  
      err.statusCode = 401;
      throw err;
    }

    req.userId = decodeToken.userId
    
    // Pass to next method
    next();
    
  } catch (error) {
    next(error)
  }
}

export { isAuthenticated };