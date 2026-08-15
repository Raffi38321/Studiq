import type { Request, Response } from "express";
import Note from "../models/note.model.js";
import producer from "../services/kafka.js";
import response from "../utils/reponse.js";

export const createNote = async (req:Request, res:Response) => {
    try {
        const {
            title,
            category,
            body
        } = req.body

        const note = await Note.create({title,category,body})
        await producer.send({
            topic: "note.created",
            messages: [{
                key: `${note._id}`,
                value: JSON.stringify(note)
            }]
        })
        response.createdSuccess(res,"berhasil buat note",note)
    } catch (error) {
        response.serverError(res,"gagal buat note")
    }
}


export const getAllNote = async (_req:Request, res:Response) => {
    try {
        const notes = await Note.find()
        response.requestSuccess(res,"berhasil daper semua note",notes)
    } catch (error) {
        response.serverError(res,"gagal getAllNote")
    }
}