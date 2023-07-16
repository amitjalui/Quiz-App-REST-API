import express from 'express';
import mongoose from "mongoose";

import userRouter from './routes/user.route';

const app = express();

/*
  * if not connection string then pass empty string.
  note: if we will not pass empty string then it will cause and err cause of undefined.
*/
const connectionString = process.env.CONNECTION_STRING || '';  

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Home Route")
})

// Redirect /user to userRouter
app.use('/user', userRouter);

mongoose.connect(connectionString)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Connected at port:", process.env.PORT)
    });
  })
  .catch((err) => {
    console.log(err);
  });