import { Kafka } from "kafkajs";
import envVariables from "../utils/Env.js";
import requestAI from "./ai.js";
import Note from "../models/note.model.js";
import logger from "../configs/logger.js";

const kafka = new Kafka({
    brokers:[envVariables.KAFKA_BROKER]
})

const consumer = kafka.consumer({
    groupId: "summary-consumer",
})

export const startConsumer = async () => {
    await consumer.subscribe({
        topic: "note.created",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) return

            const note = JSON.parse(message.value.toString())
            logger.info({event:"note.received",noteId:note._id},"note retreived")
            const res = await requestAI({
                body: note.body,
                title: note.title
            })
            logger.info({event:"note.summary.generated",noteId:note._id},"summary generated")

            const updatedNote = await Note.findByIdAndUpdate(
                note._id,
                {
                    summary: res.summary,
                    additional_info: res.additional_info
                },
                { new: true }
            )
            if(!updatedNote){
                logger.fatal({event:"note.summary.update_failed",noteId:note._id},"note not found")  
                return
            }
            logger.info({event:"note.summary.updated",noteId:note._id},"note updated")
        }
    })
}
export default consumer
