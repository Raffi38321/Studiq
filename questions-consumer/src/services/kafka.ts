import { Kafka } from "kafkajs";
import envVariable from "../utils/Env.js";
import generateQuestion from "./ai.js";
import Question from "../models/question.model.js";
import logger from "../configs/logger.js";

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
            logger.info({event:"question.generate.received",noteId:note._id},"note retreived from cluster")
            const res = await generateQuestion({title:note.title,body:note.body})
            logger.info({event:"question.generate.succeed",noteId:note._id},"question generated")
            const question = await Question.create({
                question: res.question,
                note_id: note._id
            })
            logger.info({event:"question.generate.received",questionId:question._id,noteId:note._id},"question writed")
        }
    })
}

export default consumer
