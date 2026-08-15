import { Router } from "express";
import { answerQuestionAndGetInsight, generateQuestion, getAllQuestion, getAllQuestionByNoteId } from "../controllers/question.controller.js";

const questionRouter = Router()

questionRouter.get("/", getAllQuestion)
questionRouter.put("/:id/insight",answerQuestionAndGetInsight)
questionRouter.get("/:id/note",getAllQuestionByNoteId)
questionRouter.post("/:id/generate", generateQuestion)

export default questionRouter