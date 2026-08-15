import dotenv from "dotenv"
dotenv.config()

const envVariable = {
    MONGO_URL: process.env.MONGO_URL || "",
    KAFKA_BROKER: process.env.KAFKA_BROKER || "",
    GEMINI_API: process.env.GEMINI_API||""
}

export default envVariable