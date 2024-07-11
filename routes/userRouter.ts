import express from 'express';

import { registerUser, userLogin, userLogout } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post("/register" , registerUser);
userRouter.post("/login" , userLogin);
userRouter.delete("/logout" , userLogout);

export default userRouter;