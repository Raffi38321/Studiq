import type { Request, Response } from "express";
import response from "../utils/reponse.js";
import producer from "../services/kafka.js";
import Question from "../models/question.model.js";
import { Types } from "mongoose";
import Note from "../models/note.model.js";
import logger from "../configs/logger.js";

export const generateQuestion = async (req: Request,res: Response) => {
    try {
        const { id } = req.params
        const note = await Note.findById(id)
        if (!note) {
            logger.info({event:"note.not_found",noteId:id},"note not found")
            return response.notFoundError(res,"note ga ketemu")
        }
        await producer.send({
            topic: "question.generate.requested",
            messages: [{ key:`${id}`,value: JSON.stringify(note ) }]
        })
        logger.info({event:"question.generate.requested",noteId:note._id},"sent to kafka cluster")
        response.createdSuccess(res,"berhasil request generate question",{})
    } catch (err) {
        logger.error({event:"question.generate.failed",noteId:req.params.id,err},"gagal generate question")
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
    } catch (err) {
        logger.error({err},"gagal getAllQuestionByNoteId")
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
    } catch (err) {
        logger.error({err},"gagal getAllQuestion")
        response.serverError(res,"gagal getAllQuestion")
    }
}
export const answerQuestionAndGetInsight = async (req: Request,res: Response) => {
    try {
        const { answer } = req.body
        const { id } = req.params
        const question = await Question.findByIdAndUpdate(
            id,
            { answer },
            { returnDocument: "after" }
        )
        if (!question) {
            logger.info({event: "question.not_found", questionId: id},"Question not found")
            return response.notFoundError(res, "question not found")
        }

        logger.info(
            {
                event: "question.answered",
                questionId: question._id
            },
            "Question answered successfully"
        )

        await producer.send({
            topic: "question.insight.requested",
            messages: [
                {
                    key: `${id}`,
                    value: JSON.stringify(question)
                }
            ]
        })

        logger.info(
            {
                event: "question.insight.requested",
                questionId: question._id,
                topic: "question.insight.requested"
            },
            "Question insight request sent to Kafka"
        )

        return response.requestSuccess(
            res,
            "berhasil answerQuestionAndGetInsight",
            question
        )
    } catch (err) {
        logger.error(
            {
                err,
                event: "question.answer.failed",
                questionId: req.params.id
            },
            "Failed to answer question"
        )

        return response.serverError(res, "gagal answerQuestion")
    }
}
