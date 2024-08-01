import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Categories from '../models/categoriesModel';
import Users from '../models/userModel';






export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
    try {
        const categories = await Categories.find()
        res.json(categories)
    } catch (error) {
        res.json(error)
    }
})

export const createCategory = asyncHandler(async (req, res) => {
    const { email, categories, title, price, size, bewertung, bild } = req.body;

    console.log('Request Body:', req.body); // Log the request body

    try {
        const userExist = await Users.findOne({ email });
        if (!userExist) {
            throw new Error('User not found');
        }

        if (userExist.isAdmin === true) {
            const category = await Categories.create({
                categories,
                title,
                price,
                size,
                bewertung,
                bild
            });

            res.status(201).json({ category, message: "Category created successfully" });
        } else {
            res.status(403).json({ message: "You are not admin" });
        }
    } catch (error) {
        console.error('Error creating category:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});

export const editCategories = asyncHandler(async (req, res) => {

    const { email, categories, title, price, size, bewertung, bild } = req.body;

    console.log('Request Body:', req.body); // Log the request body

    try {
        const userExist = await Users.findOne({ email });
        if (!userExist) {
            throw new Error('User not found');
        }

        if (userExist.isAdmin === true) {
            const category = await Categories.findByIdAndUpdate(req.params.id, {
                categories,
                title,
                price,
                size,
                bewertung,
                bild
            });

            res.status(201).json({ category, message: "Category updated successfully" });
        } else {
            res.status(403).json({ message: "You are not admin" });
        }
    } catch (error) {
        console.error('Error updating category:', error); // Log the error
        res.status(500).json({ message: error.message });
    }
});





