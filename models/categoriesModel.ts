import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  categories: { type: String },
  title: { type: String },
  price: { type: String },
  bewertung:{type: Number},
  size: { type: String },
  bild: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});


export default mongoose.model("Categories",categoriesSchema)
