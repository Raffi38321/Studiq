import logger from "./configs/logger.js"
import consumer, { startConsumer } from "./services/kafka.js"
import connectDB from "./services/mongo.js"

const main=async()=>{
    await connectDB()
    await consumer.connect().then(()=>{logger.info("success connect to kafka cluster")}).catch((err)=>{logger.fatal({err},"cant connect to kafka cluster")})
    await startConsumer()
}

await main()