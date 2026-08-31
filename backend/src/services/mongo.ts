import mongoose from "mongoose";
import envVariable from "../utils/ENV.js";
import logger from "../configs/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariable.MONGO_URL)
        logger.info({event:"mongo connect"},"berhasill connect mongodb")
    } catch (error) {
        logger.fatal({event:"mongo failed",error},"gagal konek mongo")
        process.exit(1)
    }
}

export default connectDB