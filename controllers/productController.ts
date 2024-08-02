
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { checkAdmin } from "../types/adminUser";

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});


export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { userId, title, price, description, photo} = req.body;

    try {
        const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
        const product = await Product.create({
            title,
            price,
            description,
            photo,
            user: user._id
        });
        res.json({ product, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
        
    }
})