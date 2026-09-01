import pino from "pino";

const logDir = "./src/logs"

const fileTransport = pino.transport({
    target :"pino/file",
    options:{destination:`${logDir}/app.log`}
})

const logger = pino({
    base:{
        service :"summary-consumer"
    },
    formatters:{
        level:(label)=>{
            return {level:label.toUpperCase()}
        }
    }
},fileTransport)

export default logger