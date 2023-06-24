import { Request, Response, NextFunction } from 'express';

const registerUser = (req: Request, res: Response, next: NextFunction) => {
  
  
  console.log("Register Done");
  console.log(req.body);
  res.send("Register Done");
}

export { registerUser };