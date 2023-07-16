import express from 'express';
import { registerUser, getUser, updateUser } from '../controllers/user.controller';

const userRouter = express.Router();

// GET /user/:userId
userRouter.get('/:userId', getUser);

// POST /user/
userRouter.post('/', registerUser);

// PUT /user/:userId
userRouter.put('/:userId', updateUser);

export default userRouter;