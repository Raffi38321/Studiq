import pino from "pino";

const logDir = "./src/logs"

const logger = pino({
    base:{
        service:"question-consumer"
    },
    formatters:{
        level:(label)=>{
            return {level:label.toUpperCase()}
        }
    },
    timestamp: pino.stdTimeFunctions.isoTime
})

export default logger
