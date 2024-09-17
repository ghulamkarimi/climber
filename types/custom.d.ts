import { Request } from "express";
import { IUser } from "../interface/userInterface";
import mongoose from "mongoose";

export interface CustomRequest extends Request {
  user: {
    _id: string;
    userId?: mongoose.Types.ObjectId;
    isAdmin: boolean;
  };
}
