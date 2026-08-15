import { Kafka } from "kafkajs";
import envVariable from "../utils/Env.js";
import generateQuestion from "./ai.js";
import Question from "../models/question.model.js";

const kafka = new Kafka({
    brokers: [`${envVariable.KAFKA_BROKER}`]
})

const consumer = kafka.consumer({
    groupId:"question-consumer"
})

export const startConsumer = async () => {
    await consumer.subscribe({
        topic: "question.generate.requested",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) return

            const note = JSON.parse(message.value.toString())
            const res = await generateQuestion({title:note.title,body:note.body})
            const question = await Question.create({
                question: res.question,
                note_id: note._id
            })

            console.log("question generated successfully", question)
        }
    })
}

export default consumer
