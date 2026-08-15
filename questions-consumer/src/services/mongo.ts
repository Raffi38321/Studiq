import mongoose from "mongoose";
import envVariable from "../utils/Env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariable.MONGO_URL)
        console.log("db connect");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB