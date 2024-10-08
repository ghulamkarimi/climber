
import Product from "../models/productModel";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { checkAdmin } from "../types/adminUser";
import Categories from "../models/categoriesModel"

export const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json(products);
});


export const createProduct = asyncHandler(async (req: Request, res: Response) => {
    const { userId, title, price,size, description, photo, category: categoryTitle } = req.body;

    try {
        const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
        if (!user) throw new Error('User is not an admin');

        let category = await Categories.findOne({ categories: categoryTitle });
        if (!category) {
            category = await Categories.create({
                title: categoryTitle,
                categories: categoryTitle,
                description: `All products for ${categoryTitle}`
            });
        }
        console.log(category)   
        if (!category) throw new Error('Category not found');
        const sizeArray = Array.isArray(size) ? size : [size];
        const product = await Product.create({
            title,
            price,
            description,
            photo,
            size: sizeArray,
            user: user._id,
            category: category._id
        });

        const populatedProduct = await Product.findById(product._id)
        .populate('user', 'firstName lastName email')  
        .populate('category', 'title description');  

        res.json({ product: populatedProduct, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
    }
});