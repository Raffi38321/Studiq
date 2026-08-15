import dotenv from "dotenv"
dotenv.config()

const envVariables = {
    KAFKA_BROKER: process.env.KAFKA_BROKER || "",
    GEMINI_KEY: process.env.GEMINI_KEY || "",
    MONGO_URL:  process.env.MONGO_URL || ""
}

export default envVariables
