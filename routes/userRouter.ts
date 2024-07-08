import express from 'express';

import { registerUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post("/users/register" , registerUser);

export default userRouter;