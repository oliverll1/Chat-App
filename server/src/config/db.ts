import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || '', {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        if (error instanceof Error) {
            console.log(`Error ${error.message}`)
        }
        else{
            console.log("An unknown error occurred");
        }
    }
}

export default connectDB;