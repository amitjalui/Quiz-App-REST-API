import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    const err = new Error("Not authenticated");

    // Header
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw err;
    }

    // Decode token
    const token = authHeader.split(" ")[1];
    let decodeToken:{userId: String, int: Number, exp: Number};

    try {
      decodeToken = <any> jwt.verify(token, "mytemporarysecretkey");
    } catch (error) {
      throw err;
    }

    if (!decodeToken) {
      throw err;
    }

    // Pass to next method
    req.userId = decodeToken.userId

    next();
    
  } catch (error) {
    next(error)
  }
}

export { isAuthenticated };