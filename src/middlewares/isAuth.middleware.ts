import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const isUserAuthenticate = true;

  if (isUserAuthenticate) {
    next();
  } else {
    throw new Error("User not exist");
  }
}

export { isAuthenticated };