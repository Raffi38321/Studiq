import consumer, { startConsumer } from "./services/kafka.js"
import connectDB from "./services/mongo.js"

const main=async()=>{
    await connectDB()
    await consumer.connect().then(()=>{console.log("consumer connect ke cluster")})
    await startConsumer()
}

await main()