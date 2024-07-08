import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './config/dbConnect';
import userRouter from './routes/userRouter';
import cors from "cors"
 


dotenv.config();
dbConnect();


const app = express();


app.use(express.json());
app.use(cors())

app.use(userRouter)


const PORT = process.env.PORT || 3004;
app.listen(PORT , () => console.log(`Server running on port ${PORT}`))
