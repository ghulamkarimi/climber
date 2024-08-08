import express from "express"
import { createTopProducts, getAllProducts } from "../controllers/topProductController"

const topProductRouter = express.Router()


topProductRouter.get("/getAll",getAllProducts)
topProductRouter.post("/create",createTopProducts)



export default topProductRouter