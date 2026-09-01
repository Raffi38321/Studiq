import pino from "pino";

const logDir = "./src/logs"
const fileTransport = pino.transport({
    target:"pino/file",
    options:{destination:`${logDir}/app.log`}
})

const logger = pino({
    base:{
        service:"insight-consumer"
    },
    formatters:{
        level:(label)=>{
            return {level:label.toUpperCase()}
        },
         bindings:(bindings)=>{
            return{pid:bindings.pid,host:bindings.hostname}
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime
},fileTransport)


export default logger