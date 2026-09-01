import pino from "pino";

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
})

export default logger
