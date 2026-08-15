import mongoose from "mongoose"
import envVariables from "../utils/Env.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.MONGO_URL)
        console.log("mongo connect");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB