import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const authRouter = express.Router();

// POST /auth/
authRouter.post('/', registerUser);

// POST /auth/login
authRouter.post('/login', loginUser)

export default authRouter;