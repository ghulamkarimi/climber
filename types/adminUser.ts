import mongoose from "mongoose";
import Users from "../models/userModel";

export const checkAdmin = async (userId: mongoose.Types.ObjectId) => {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isAdmin) {
      throw new Error('You are not authorized to perform this action');
    }
    return user;
  };