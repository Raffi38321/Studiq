import pino, { levels } from "pino";

const logger = pino({
    level : "info",
    formatters:{
        bindings:(bindings)=>{
            return{pid:bindings.pid,host:bindings.hostname,services:"backend"}
        },
        level:(label)=>{
            return{level:label.toUpperCase()}
        },
    },
    timestamp: pino.stdTimeFunctions.isoTime
})

export default logger