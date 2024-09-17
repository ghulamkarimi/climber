import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Categories from '../models/categoriesModel';
import { checkAdmin } from '../types/adminUser';
import path from 'path';
import Users from '../models/userModel';
import { CustomRequest } from '../types/custom';




export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Categories.find();
  res.json(categories);
});


export const createCategories = asyncHandler(async (req: Request, res: Response) => {
  const { userId, categories, title,description} = req.body;
  const photo = req.file
  console.log('Received file:', req.file); 
  console.log('Serving file from:', path.join(__dirname, '../uploads', req.file.filename));

  try {
    const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
    const existingCategory = await Categories.findOne({ title: title.trim().toLowerCase() });


    if (existingCategory) throw new Error('Category already exists');
     const category = await Categories.create({
      categories,
      userId: user._id,
      title,
      description,
     photo: photo ? `http://localhost:3009/uploads/${req.file.filename}` : undefined


    });

    res.status(201).json({ category, message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: error.message });
  }
});


export const editCategories = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { userId, categories, title, photo } = req.body;
  const categoryId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error('Invalid category ID');
  }
  try {
    const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
    const category = await Categories.findByIdAndUpdate(categoryId, {
      categories,
      title,
      photo,
      user: user._id
    },
      { new: true }
    );
    if (!category) {
      throw new Error('Category not found');
    }
    res.json({ category, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: error.message });
  }
})




export const deleteCategories = asyncHandler(async (req: CustomRequest, res: Response) => {
  const userId = req.user?._id

  console.log("userId:", userId);
  const { categoryId } = req.body;

  // Validate userId
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
     res.status(400).json({ message: 'Invalid or missing user ID' });
     return
  }

  // Validate categoryId
  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
     res.status(400).json({ message: 'Invalid or missing category ID' });
     return
  }

  try {
    // Fetch user data
    const userAdmin = await checkAdmin(new mongoose.Types.ObjectId(userId));
    console.log("Fetched userData:", userAdmin);

    if (!userAdmin) {
       res.status(404).json({ message: 'User not found' });
       return
    }

    // Delete category
    const category = await Categories.findByIdAndDelete(categoryId);
    if (!category) {
       res.status(404).json({ message: 'Category not found' });
       return
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: error.message });
  }
});
