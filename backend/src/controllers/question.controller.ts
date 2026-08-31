import type { Request, Response } from "express";
import response from "../utils/reponse.js";
import producer from "../services/kafka.js";
import Question from "../models/question.model.js";
import { Types } from "mongoose";
import Note from "../models/note.model.js";

export const generateQuestion = async (req: Request,res: Response) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        if (!note) {
            logger.war
            return response.notFoundError(res,"note ga ketemu")
        }
        console.log(JSON.stringify( note ));
        await producer.send({
            topic: "question.generate.requested",
            messages: [{ key:`${id}`,value: JSON.stringify(note ) }]
        })

        response.createdSuccess(res,"berhasil request generate question",{})
    } catch (error) {
        response.serverError(res,"gagal generate question")
    }
}

export const getAllQuestionByNoteId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params as { id: string };
        if (!id) {
            return response.userError(res, "ID tidak ditemukan",404);
        }
        if (!Types.ObjectId.isValid(id)) {
            return response.userError(res, "Format ID tidak valid",400);
        }
        const idToObjectId = new Types.ObjectId(id);
        const questions = await Question.find({
            note_id: idToObjectId
        });
        return response.requestSuccess(
            res,
            "berhasil getAllQuestionByNoteId",
            questions
        );
    } catch (error) {
        return response.serverError(
            res,
            "gagal getAllQuestionByNoteId"
        );
    }
};

export const getAllQuestion = async (_req: Request,res: Response) => {
    try {
        const questions = await Question.find()
        response.requestSuccess(res,"berhasil getAllQuestion",questions)
    } catch (error) {
        response.serverError(res,"gagal getAllQuestion")
    }
}

export const answerQuestionAndGetInsight = async (req: Request, res: Response) => {
    try {
        const { answer } = req.body
        const {id} = req.params
        const question = await Question.findByIdAndUpdate(id, { answer: answer }, { returnDocument: "after" })
        await producer.send({
            topic: "question.insight.requested",
            messages:[{key:`${id}`,value:JSON.stringify(question)}]
        })
        response.requestSuccess(res,"berhasil answerQuestionAndGetInsight",question)
    } catch (error) {
        console.log(error);
        response.serverError(res,`gagal answerQuestion ${error}`)
    }
}
