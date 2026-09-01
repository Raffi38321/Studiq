import type { Request, Response } from "express";
import Note from "../models/note.model.js";
import producer from "../services/kafka.js";
import response from "../utils/reponse.js";
import logger from "../configs/logger.js";

export const createNote = async (req:Request, res:Response) => {
    try {
        const {
            title,
            category,
            body
        } = req.body

        const note = await Note.create({title,category,body})
        logger.info({event:"note.created",noteId:note._id},"success create note")
        
        await producer.send({
            topic: "note.created",
            messages: [{
                key: `${note._id}`,
                value: JSON.stringify(note)
            }]
        })
        logger.info({event:"note.created",noteId:note._id},"send to kafka cluster")

        response.createdSuccess(res,"berhasil buat note",
            note
        )
    } catch (err) {
        logger.error({event:"note.create.failed",err},"gagal buat note")
        response.serverError(res,"gagal buat note")
    }
}


export const getAllNote = async (_req:Request, res:Response) => {
    try {
        const notes = await Note.find()
        response.requestSuccess(res,"berhasil daper semua note",notes)
    } catch (err) {
        logger.error({err},"gagal getAllNote")
        response.serverError(res,"gagal getAllNote")
    }
}