import express from 'express';
import { isAuthenticated } from '../middlewares/isAuth.middleware';
import { getUser, updateUser } from '../controllers/user.controller';

const userRouter = express.Router();

// User should be authenticate
// User should be authorize
// GET /user/:userId
userRouter.get('/:userId', isAuthenticated, getUser);

// User should be authenticate
// User should be authorize
// PUT /user/
userRouter.put('/', isAuthenticated, updateUser);

export default userRouter;