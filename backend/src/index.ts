import express, { type Request, type Response } from "express";
import envVariable from "./utils/ENV.js";
import connectDB from "./services/mongo.js";
import producer from "./services/kafka.js";
import noteRouter from "./routes/note.route.js"
import questionRouter from "./routes/question.route.js";
import logger from "./configs/logger.js"
import { pinoHttp } from "pino-http";

const app = express()
const PORT = envVariable.PORT

app.use(express.json())
app.use(pinoHttp({logger}))
await connectDB()
await producer.connect().then(()=>{logger.info("kafka connect")}).catch((err)=>logger.warn({err},"kafka not connect"))

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message:"backend running"
    })
})
app.use("/notes", noteRouter)
app.use("/questions",questionRouter)

app.listen(PORT, () => {
    logger.info("server on")
})
