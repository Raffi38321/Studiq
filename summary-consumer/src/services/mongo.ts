import mongoose from "mongoose"
import envVariables from "../utils/Env.js";
import logger from "../configs/logger.js";

const connectDB = async () => {
    try {
        await mongoose.connect(envVariables.MONGO_URL)
        logger.info("mongo connect");
    } catch (err) {
        logger.fatal({event:"mongo.not_connect",err},"cant connect to mongo")
        process.exit(1)
    }
}

export default connectDB