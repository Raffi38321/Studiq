import type { NextFunction, Request, Response } from "express"
import type { ZodObject } from "zod"
import response from "../utils/reponse.js"

const validate = (schema:ZodObject)=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        
            const result = await schema.safeParseAsync({
                body:req.body,
                params:req.params,
                query:req.query
            })
            if (!result.success) {
                return response.userError(res,"body is not correct",400)  
            }
            return next()
            
    }
}

export default validate