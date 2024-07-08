import mongoose from 'mongoose';

export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string,{   
        });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Database connection failed');
    }
}
