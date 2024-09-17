import mongoose from "mongoose";

export interface IProductsItems {
  id: string;
  user? : string;
  photo: string;
  photoDetailsOne: string;
  photoDetailsTwo: string;
  photoDetailsThree: string;
  photoDetailsFour: string;
  title: string;
  price: string;
  photoDetailsTow: string;
  descriptions: string
  evaluation: number
  colors: string[]
  size: string[]
}

export interface ITopProducts {
  title: string;
  photo: string;
  price: string;
  size: string[];
  evaluation: number;
  user?: mongoose.Types.ObjectId;
  category?: mongoose.Types.ObjectId
}

export type TProducts = Partial<IProductsItems>


export interface ICategories {
  _id: string;
  categories: "men" | "women";
  title: string;
  photo: File | null;
}