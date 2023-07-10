import express from 'express';
import mongoose from "mongoose";

import userRouter from './routes/user.route';

const app = express();

const connectionString = "mongodb+srv://Quiz-App-REST-API:Quiz-App-REST-API@cluster0.1gpc1be.mongodb.net/quizdb?retryWrites=true&w=majority";

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Home Route")
})

// Redirect /user to userRouter
app.use('/user', userRouter);

mongoose.connect(connectionString)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server Connected")
    });
  })
  .catch((err) => {
    console.log(err);
  });