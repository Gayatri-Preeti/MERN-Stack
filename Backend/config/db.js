import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const options = {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
            bufferCommands: false
        };
        
        const conn = await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`MongoDB Connected : ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        console.error("Please check your MongoDB connection string in environment variables");
        process.exit(1);
    }
};