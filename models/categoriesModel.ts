 
import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  categories: { type: String },
  title: { type: String },
  photo: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});


export default mongoose.model("Categories",categoriesSchema)
