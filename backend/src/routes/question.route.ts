import { Router } from "express";
import { answerQuestionAndGetInsight, generateQuestion, getAllQuestion, getAllQuestionByNoteId } from "../controllers/question.controller.js";
import validate from "../middlewares/validateBody.middleware.js";
import { generateQuestionSchema } from "../validators/question.validator.js";

const questionRouter = Router()

questionRouter.get("/", getAllQuestion)
questionRouter.put("/:id/insight",answerQuestionAndGetInsight)
questionRouter.get("/:id/note",getAllQuestionByNoteId)
questionRouter.post("/:id/generate",validate(generateQuestionSchema), generateQuestion)

export default questionRouter