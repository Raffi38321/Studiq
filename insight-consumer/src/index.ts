import consumer, { startConsumerInsight } from "./services/kafka.js"
import connectDB from "./services/mongo.js"

const main = async () => {
    await consumer.connect()
    await startConsumerInsight()
    await connectDB()
}

await main()