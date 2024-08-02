import { Request } from "express";
import { IUser } from "../interface/userInterface";

export interface CustomRequest extends Request {
  user: {
    _id: string;
    userId?: IUser;
    isAdmin: boolean;
  };
}
