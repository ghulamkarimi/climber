import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "../../interface/userInterface";
import { CustomRequest } from "../../types/custom";

export const verifyToken = (
  req: CustomRequest,
  res: Response,
  next: Function
) => {
  const authHeader = req.headers?.authorization;
  console.log("authHeader: ",authHeader)

    const token = authHeader && authHeader.toString().split(" ")[1];
    if (!token) throw new Error("Token not provided");
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN as Secret,
      (err, decoded) => {
        if (err || !decoded || typeof decoded !== "object")
          throw new Error("Token verification failed");
        req.user.userId = (decoded as JwtPayload).userId;
        next();
      }
    );
  } 