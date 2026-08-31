import pino from "pino";

const logDir = "./src/logs"
const fileTransport = pino.transport({
    target:"pino/file",
    options:{destination:`${logDir}/app.log`}
})

const logger = pino({
    level : "info",
    base:{
        service:"backend"
    },
    formatters:{
        bindings:(bindings)=>{
            return{pid:bindings.pid,host:bindings.hostname}
        },
        level:(label)=>{
            return{level:label.toUpperCase()}
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime,
},fileTransport)

export default logger