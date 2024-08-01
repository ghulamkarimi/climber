import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect";
import userRouter from "./routes/userRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import categoriesRouter from "./routes/categoriesRouter";


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

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
