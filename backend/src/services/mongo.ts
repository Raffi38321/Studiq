import mongoose from "mongoose";
import envVariable from "../utils/ENV.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariable.MONGO_URL)
        console.log("db connect");
    } catch (error) {
        console.log("db gak connect");
        process.exit(1)
    }
}

export default connectDB