import logger from "./configs/logger.js"
import consumer, { startConsumer } from "./services/consumer.js"
import connectDB from "./services/mongo.js"

const main = async () => {
    await connectDB()
    await consumer.connect()
    await startConsumer()
}

await main()