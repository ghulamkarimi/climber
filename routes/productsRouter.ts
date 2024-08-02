import express from "express";

const productRouter = express.Router();

import { getAllProducts, createProduct } from "../controllers/productController";

productRouter.get("/getAll", getAllProducts);
productRouter.post("/create", createProduct);

export default productRouter;