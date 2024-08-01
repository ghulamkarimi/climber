import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Jwt, { Secret, decode } from "jsonwebtoken";
import Users from "../../models/userModel";

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  if (!token) throw new Error("Token das not exist");
  const user = await Users.findOne({ access_token: token });
  if (!user) throw new Error("User das not exist");
  Jwt.verify(
    token,
    process.env.ACCESS_TOKEN as Secret,
    (error: any, decode: any) => {
      if (error) throw new Error("Access token verification failed");
      const {
        _id: userId,
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
      }= user
      const refresh_Token = Jwt.sign({
        _id: userId,
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
      },process.env.REFRESH_TOKEN as Secret,{expiresIn:"20s"})
      res.json({"refresh_Token":refresh_Token})
    }
  );
});
