import express from 'express';

import { registerUser, userLogin, userLogout } from '../controllers/userController';
import { userValidator, validate } from '../middleware/validator';


const userRouter = express.Router();

userRouter.post("/register",userValidator, validate ,registerUser);

userRouter.post("/login" , userLogin);
userRouter.delete("/logout" , userLogout);

export default userRouter;