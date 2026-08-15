import type { Response } from "express";

const response = {
    serverError: (res:Response,message:string) => {
        return res.status(500).json({
            status: "failed",
            message
        })
    },
    userError: (res: Response, message: string,code:number) => {
        return res.status(code).json({
            status: "failed",
            message
        })
    },
    notFoundError:(res:Response,message:string)=>{
        return res.status(404).json({
            status: "failed",
            message
        })
    }
    ,
    createdSuccess: (res: Response, message: string, data: any)=>{
        return res.status(201).json({
            status: "success",
            message,
            data
        })
    },
    requestSuccess: (res: Response, message: string, data: any,code:number=200)=>{
        return res.status(code).json({
            status: "success",
            message,
            data
        })
    },
}

export default response