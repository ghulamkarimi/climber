import mongoose from "mongoose";
import Users from "../models/userModel";

export const checkAdmin = async (userId: mongoose.Types.ObjectId) => {
  console.log("userIdChekAdmin",userId)
  try {
    const user = await Users.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    if (!user.isAdmin) {
      throw new Error('You are not authorized to perform this action');
    }
    return user;
  } catch (error) {
    console.error('Error in checkAdmin:', error.message);
    throw error;
  }
};
