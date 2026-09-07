import { Router } from "express";
import { createNote, getAllNote, getNoteById } from "../controllers/note.controller.js";
import validate from "../middlewares/validateBody.middleware.js";
import noteSchema, { checkNoteIdSchema } from "../validators/note.validator.js";

const noteRouter = Router()

noteRouter.post("/",validate(noteSchema),createNote)
noteRouter.get("/",getAllNote)
noteRouter.get("/:id",validate(checkNoteIdSchema),getNoteById)

export default noteRouter