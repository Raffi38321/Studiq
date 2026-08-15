import { Kafka, Partitioners } from "kafkajs";
import envVariable from "../utils/ENV.js";

const kafka = new Kafka({
    brokers: [envVariable.broker]
})

const producer = kafka.producer({
    createPartitioner:Partitioners.DefaultPartitioner
})

export default producer