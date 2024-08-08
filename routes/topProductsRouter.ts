import express from "express"
import { createTopProducts } from "../controllers/topProductController"

const topProductRouter = express.Router()

topProductRouter.post("/create",createTopProducts)



export default topProductRouter