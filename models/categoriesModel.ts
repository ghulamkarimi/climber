import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  categories: { type: String },
  title: { type: String },
  price: { type: String },
  size: { type: String },
  bild: { type: String },
});


export default mongoose.model("Categories",categoriesSchema)
