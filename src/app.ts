import express from 'express';
import userRouter from './routes/user.route';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send("connected")
})

// Redirect to /user to user.route
app.use('/user', userRouter)

app.listen(3000);