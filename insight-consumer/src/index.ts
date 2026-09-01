import logger from "./configs/logger.js"
import consumer, { startConsumerInsight } from "./services/kafka.js"
import connectDB from "./services/mongo.js"

const main = async () => {
    await consumer.connect().then(()=>{logger.info("kafka cluster connected")}).catch((err)=>{logger.fatal({err},"kafka cluster cant connect")})
    await startConsumerInsight()
    await connectDB()
}

await main()
