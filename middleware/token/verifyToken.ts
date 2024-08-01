import { Response, Request } from "express";
import Jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { IUser } from "../../interface/userInterface";


interface CustomRequest extends  Request{
    userId?:IUser
}

export const verifyToken = (req: CustomRequest, res: Response,next:Function) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new Error("Token not provider ");
  Jwt.verify(token, process.env.REFRESH_TOKEN as Secret, (error, decode) => {
    if (error || !decode || typeof decode !== "object")
      throw new Error("Token verification failed");
    req.userId = (decode as JwtPayload).userId
  });
  next()
};
