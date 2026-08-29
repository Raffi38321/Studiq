import express, { type Request, type Response } from "express";
import envVariable from "./utils/ENV.js";
import connectDB from "./services/mongo.js";
import producer from "./services/kafka.js";
import noteRouter from "./routes/note.route.js"
import questionRouter from "./routes/question.route.js";
import PinoHttp, { pinoHttp } from "pino-http";
import logger from "./configs/logger.js"

const app = express()
const PORT = envVariable.PORT

app.use(express.json())
// app.use(pinoHttp())
// await connectDB()
// await producer.connect().then(()=>console.log("producer connect ke cluster"))`

app.get("/", (req: Request, res: Response) => {
    // req.log.info("coba")
    logger.info()
    res.status(200).json({
        status: "success",
        message:"backend running"
    })
})
app.use("/notes", noteRouter)
app.use("/questions",questionRouter)

app.listen(PORT, () => {
    console.log(`backend run in port ${PORT}`);
})
