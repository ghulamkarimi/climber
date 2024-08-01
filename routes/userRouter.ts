import express from 'express';


import { registerUser, userLogin, userLogout } from '../controllers/userController';
import { userValidator, validate } from '../middleware/validator';
import { accessTokenExpired, registerUser, userLogin, userLogout } from '../controllers/userController';
import { refreshToken } from '../middleware/token/refreshToken';
import { verifyToken } from '../middleware/token/verifyToken';


const userRouter = express.Router();

// Check Token 
userRouter.get("/token",refreshToken)
userRouter.get("/check-token",accessTokenExpired)


//User Register/Login/Logout
userRouter.post("/register",userValidator, validate ,registerUser);

userRouter.post("/login" , userLogin);
userRouter.delete("/logout" , userLogout);

export default userRouter;