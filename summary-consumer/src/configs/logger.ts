import pino from "pino";

const logger = pino({
    base:{
        service :"summary-consumer"
    },
    formatters:{
        level:(label)=>{
            return {level:label.toUpperCase()}
        }
    }
})

export default logger
