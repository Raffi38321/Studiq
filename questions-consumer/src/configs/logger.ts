import pino from "pino";

const logDir = "./src/logs"

const fileTransport = pino.transport({
    target:"pino/file",
    options:{destination:`${logDir}/app.log`}
})

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
},fileTransport)

export default logger