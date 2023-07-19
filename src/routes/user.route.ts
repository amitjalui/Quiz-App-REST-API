import express from 'express';
import { getUser, updateUser } from '../controllers/user.controller';

const userRouter = express.Router();

// User should be authenticate
// User should be authorize
// GET /user/:userId
userRouter.get('/:userId', getUser);

// User should be authenticate
// User should be authorize
// PUT /user/
userRouter.put('/', updateUser);

export default userRouter;