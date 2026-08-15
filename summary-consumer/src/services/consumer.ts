import { Kafka } from "kafkajs";
import envVariables from "../utils/Env.js";
import requestAI from "./ai.js";
import Note from "../models/note.model.js";

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

            const res = await requestAI({
                body: note.body,
                title: note.title
            })

            await Note.findByIdAndUpdate(
                note._id,
                {
                    summary: res.summary,
                    additional_info: res.additional_info
                },
                { new: true }
            )
        }
    })
}
export default consumer
