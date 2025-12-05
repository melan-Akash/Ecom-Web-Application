import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log("DB Connected");
    });

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/forever`);
        console.log("MongoDB connection successful");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

export default connectDB;
