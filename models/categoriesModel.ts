 
import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({

  title: { type: String },
  categories: { 
    type: String,
    enum: ["men", "women"]
  },
  description: { type: String },
  photo: { 
    type: String ,
    default: "https://th.bing.com/th/id/R.ee3498ce2d66a8d750a1b49ec88331cf?rik=mXZJ65gQ7NsM0A&pid=ImgRaw&r=0" 
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});


export default mongoose.model("Categories",categoriesSchema)
