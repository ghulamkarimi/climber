import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Categories from '../models/categoriesModel';
import { CustomRequest } from '../types/custom';
import { checkAdmin } from '../types/adminUser';


export const getAllCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await Categories.find();
  res.json(categories);
});


export const createCategories = asyncHandler(async (req: Request, res: Response) => {
  const { userId, categories, title, photo,description} = req.body;

  try {
    const user = await checkAdmin(new mongoose.Types.ObjectId(userId));
    const existingCategory = await Categories.findOne({ title: title.trim().toLowerCase() });
    if (existingCategory) throw new Error('Category already exists');
     const category = await Categories.create({
      categories,
      user: user._id,
      title,
      description,
      photo,
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
  const userIdString = req.body.userId || req.user?._id;
  const categoryId = req.params.id;

  if (!userIdString || !categoryId) {
    res.status(400).json({ message: 'User ID and category ID are required' });
    return;
  }

  if (!mongoose.Types.ObjectId.isValid(userIdString) || !mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400).json({ message: 'Invalid user ID or category ID' });
    return;
  }
  const userId = new mongoose.Types.ObjectId(userIdString);

  try {
    await checkAdmin(userId);
    const category = await Categories.findByIdAndDelete(categoryId);

    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: error.message });
  }
});