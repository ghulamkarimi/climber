import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { checkAdmin } from "../types/adminUser";
import TopProducts from "../models/topProducts";
import Categories from "../models/categoriesModel";

export const createTopProducts = asyncHandler(async (req: Request, res: Response) => {
    const { userId, title, photo, price, evaluation, category: categoryTitle } = req.body;
    try {
        const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
        if (!user) throw new Error("User is not admin");

        let category = await Categories.findOne({ categories: categoryTitle });
        if (!category) {
            category = await Categories.create({
                title: categoryTitle,
                categories: categoryTitle,
                description: `All products for ${categoryTitle}`
            });
        }

        // Create the TopProduct
        const topProduct = await TopProducts.create({
            title,
            photo,
            price,
            evaluation,
            user: user._id,
            category: category._id
        });

        // Populate user and category details
        const populatedTopProduct = await TopProducts.findById(topProduct._id)
            .populate('user', 'name email') // Populate user fields
            .populate('category', 'title categories'); // Populate category fields

        res.status(200).json({ topProduct: populatedTopProduct, message: 'Product created successfully' });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: error.message });
    }
});
