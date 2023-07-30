import express, { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";

import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';
import ProjectError from './helper/error';

interface ReturnreqResonse {
  status: "success" | "error",
  message: String,
  data: {}
}

const app = express();

/*
  * if not connection string then pass empty string.
  note: if we will not pass empty string then it will cause and err cause of undefined.
*/
const connectionString = process.env.CONNECTION_STRING || '';  

app.use(express.json());

// customizing Request interface in Express. 
declare global {
  namespace Express {
    interface Request {
      userId: String;
    }
  }
}

app.get('/', (req, res) => {
  res.send("Home Route")
})

// Redirect /user to userRouter
app.use('/user', userRouter);

// Redirect /auth to userRouter
app.use('/auth', authRouter);

// Error
app.use((err: ProjectError, req: Request, res: Response, next: NextFunction) => {
  let message:String;
  let statusCode:number;

  if (!!err.statusCode && err.statusCode < 500) {
    message = err.message;
    statusCode = err.statusCode;
  } else {
    message = "Something went wrong please try after sometimes!";
    statusCode = 500;
  }
  
  let reqRes: ReturnreqResonse = {status: "error", message, data:{}};
  
  if (!!err.data) {
    reqRes.data = err.data;
  }    
  
  console.log(err.statusCode, err.message);
  res.status(statusCode).send(reqRes);
});

mongoose.connect(connectionString)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Connected at port:", process.env.PORT)
    });
  })
  .catch((err) => {
    console.log(err);
  });