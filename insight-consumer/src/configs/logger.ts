import pino from "pino";

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
})


export default logger
