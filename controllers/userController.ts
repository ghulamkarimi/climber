import asyncHandler from "express-async-handler";
import { Request, Response, request, response } from "express";
import Users from "../models/userModel";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { IUser } from "../interface/userInterface";

export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, confirmPassword, gender ,isAdmin} =
      req.body;
    const existingUser = await Users.findOne({ email });

    try {
      if (existingUser) throw new Error("User already exists");
      if (password !== confirmPassword)
        throw new Error("Passwords do not match");
      const user = await Users.create({
        firstName,
        lastName,
        email,
        password,
        gender,
        isAdmin
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
  console.log(req.body);
  const userFound = await Users.findOne({ email });
  if (!userFound) throw new Error(" Email not found please register");
  if (userFound && (await userFound.isPasswordMatched(password))) {
    const {
      _id: userId,
      firstName,
      lastName,
      email,
      profile_photo,
      address,
      telephone,
      gender,
      isAdmin
    } = userFound;
    const accessToken = jwt.sign(
      {
        _id: userId,
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
        isAdmin
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    const refreshToken = jwt.sign(
      {
        firstName,
        lastName,
        email,
        profile_photo,
        address,
        telephone,
        gender,
        isAdmin
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "2m",
      }
    );
    const user = await Users.findByIdAndUpdate(userId, {
      access_token: accessToken,
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 30 * 1000,
      secure: false,
      sameSite: "strict",
    });

    const decode = jwtDecode<IUser>(accessToken);
    res.status(200).json({
      user: user,
      userInfo: decode,
      token: refreshToken,
      message: "login successfully",
    });
  } else {
    throw new Error("Invalid username or password");
  }
});

export const userLogout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  console.log("token", token);
  if (!token) throw new Error("no token ");
  const user = await Users.findOne({ access_token: token });
  if (!user) throw new Error("no user");
  user.access_token = undefined;
  user.save();
  res.clearCookie("accessToken");
  res.json({ message: "logout Successful" });
});


export const accessTokenExpired = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.accessToken;
  
  if (!token) {
     res.status(401).json({ message: "Token not found, user is not logged in" });
  }

    const user = await Users.findOne({ access_token: token });

    if (!user) {
       res.status(401).json({ message: "User is not logged in" });
    }

    res.json({ user: user, message: "User is logged in" });
  } 
);

