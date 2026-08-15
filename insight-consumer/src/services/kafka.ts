import { Kafka } from "kafkajs";
import envVariable from "../utils/Env.js";
import generateInsight from "./ai.js";
import Question from "../models/question.model.js";

const kafka = new Kafka({
    brokers: [envVariable.KAFKA_BROKER],
})

const consumer = kafka.consumer({
    groupId: "insight-consumer",
})

export const startConsumerInsight = async () => {
    await consumer.subscribe({
        topic:"question.insight.requested"
    })
    await consumer.run({
        eachMessage: async ({ message }) => {
            if (!message.value) {
                return
            }
            const question = JSON.parse(message.value.toString())
            console.log(question);
            const id = question._id
            const res = await generateInsight({ question: question.question, answer: question.answer })
            const updatedQuestion = await Question.findByIdAndUpdate(id, { ai_answer: res.ai_answer, score: res.score }, { new: true })
            console.log(updatedQuestion);
        }
    })
}

export default consumer
