import mongoose from "mongoose";
import envVariable from "../utils/Env.js";
import logger from "../configs/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariable.MONGO_URL)
        logger.info("connected to mongoDB")
    } catch (err) {
        logger.fatal({event:"mongo.not_connect",err},"cant connect to mongoDB")
        process.exit(1)
    }
}

export default connectDB