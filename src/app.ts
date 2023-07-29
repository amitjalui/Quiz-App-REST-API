import express, { Request, Response, NextFunction } from 'express';
import mongoose from "mongoose";

import userRouter from './routes/user.route';
import authRouter from './routes/auth.route';

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
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    // logger for err
    console.log(err);
    
    res.send("Something went wrong please try after sometimes!");
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