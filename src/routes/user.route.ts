import express from 'express';
import { registerUser, getUser, updateUser, loginUser } from '../controllers/user.controller';

const userRouter = express.Router();

// GET /user/:userId
userRouter.get('/:userId', getUser);

// POST /user/
userRouter.post('/', registerUser);

// POST /user/login
userRouter.post('/login', loginUser)

// PUT /user/:userId
userRouter.put('/', updateUser);


export default userRouter;