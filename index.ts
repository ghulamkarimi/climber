import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";
import userRouter from "./routes/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import categoriesRouter from "./routes/categoriesRouter";
import { errorHandler, notFound } from "./middleware/errors/errorHandler";
import productRouter from "./routes/productsRouter";
import topProductRouter from "./routes/topProductsRouter";
import path from 'path';


dotenv.config();
dbConnect();

const app = express();


app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/categories" , categoriesRouter);
app.use("/products" ,productRouter);
app.use("/topProducts" ,topProductRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));






app.use(errorHandler)
app.use(notFound)



const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Static files served from /uploads at ${path.join(__dirname, 'uploads')}`);
 
  

});
