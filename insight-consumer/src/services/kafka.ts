import { Kafka } from "kafkajs";
import envVariable from "../utils/Env.js";
import generateInsight from "./ai.js";
import Question from "../models/question.model.js";
import logger from "../configs/logger.js";

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
            const id = question._id
            logger.info({event:"question.insight.received",questionId:id},"success retreive question from cluster")
            const res = await generateInsight({ question: question.question, answer: question.answer })
            logger.info({event:"question.insight.generated",questionId:id},"insight generated")
            const updatedQuestion = await Question.findByIdAndUpdate(id, { ai_answer: res.ai_answer, score: res.score }, { new: true })
            if(!updatedQuestion){
                logger.warn({event:"question.insight.update.not_found",questionId:id},"failed update question cause not found")
                return
            }
            logger.info({event:"question.insight.updated",questionId:id},"updated question with insight")
        }
    })
}

export default consumer
