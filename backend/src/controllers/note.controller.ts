import type { Request, Response } from "express";
import Note from "../models/note.model.js";
import producer from "../services/kafka.js";
import response from "../utils/reponse.js";
import logger from "../configs/logger.js";
import {randomUUID} from "crypto"

export const createNote = async (req:Request, res:Response) => {
    const correlationId = randomUUID()
    try {
        const {
            title,
            category,
            body
        } = req.body

        const note = await Note.create({title,category,body})
        logger.info({event:"note.created",noteId:note._id,correlationId},"success create note")
        
        await producer.send({
            topic: "note.created",
            messages: [{
                key: `${note._id}`,
                value: JSON.stringify({note,correlationId})
            }]
        })
        logger.info({event:"note.created",noteId:note._id,correlationId},"send to kafka cluster")

        response.createdSuccess(res,"berhasil buat note",
            note
        )
    } catch (err) {
        logger.error({event:"note.create.failed",err,correlationId},"gagal buat note")
        response.serverError(res,"gagal buat note")
    }
}


export const getAllNote = async (req:Request, res:Response) => {
    try {
        const limit = Math.min(Math.max(Number(req.query.limit)||10,1),100)
        const page = Math.max(Number(req.query.page)||1,1)
        const skip = (page-1)*limit
        const total = await Note.countDocuments()
        const notes = await Note.find().skip(skip).limit(limit).sort({createdAt:-1})
        response.requestSuccess(res,"berhasil daper semua note",{notes,total,limit,page,totalPages:Math.ceil(total/limit)})
    } catch (err) {
        logger.error({err},"gagal getAllNote")
        response.serverError(res,"gagal getAllNote")
    }
}