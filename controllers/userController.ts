import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import Users from "../models/userModel";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../interface/userInterface";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, confirmPassword, gender } =
      req.body;
    const existingUser = await Users.findOne({ email });
    if (existingUser) throw new Error("User already exists");
    if (password !== confirmPassword) throw new Error("Passwords do not match");
    try {
      const user = await Users.create({
        firstName,
        lastName,
        email,
        password,
        gender,
      });
      res.json({
        user: user,
        message: "User registered successfully",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

export const userLogin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await Users.findOne({ email });
    if (!userFound) throw new Error(" Email not found please register");
    if (userFound && userFound.isPasswordMatched(password)) {
        
      const {
        _id:userId,
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
      } = userFound;
      const accessToken = await jwt.sign({
        _id:userId,
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
      },process.env.ACCESS_TOKEN ,{
        expiresIn: "30d",

      })

      const refreshToken = jwt.sign({
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
      },process.env.REFRESH_TOKEN,{
        expiresIn:"2m"
      })
      const user = await Users.findByIdAndUpdate(userId,{
        access_token:accessToken
      })
      res.cookie("accessToken",accessToken,{
        httpOnly:true,
        maxAge:24*60*60*30*1000,
        secure:false,
        sameSite:"lax"
      });

      const decode = jwtDecode<IUser>(accessToken)
      res.json({
        user:user,
        userInfo:decode,
        refreshToken:refreshToken,
        message:"login successfully"

      })
    }
  } catch (error) {
    throw new Error("Login Failed you have a problem")
  }
});
