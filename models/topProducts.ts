import mongoose from "mongoose";
import { ITopProducts } from "../interface/productsInterface";

const topProductsSchema = new mongoose.Schema<ITopProducts>({
    title: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    evaluation: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category'},

    });

const TopProducts = mongoose.model('TopProducts', topProductsSchema);

export default TopProducts;