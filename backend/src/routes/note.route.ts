import { Router } from "express";
import { createNote, getAllNote } from "../controllers/note.controller.js";
import validate from "../middlewares/validateBody.middleware.js";
import noteSchema from "../validators/note.validator.js";

const noteRouter = Router()

noteRouter.post("/",validate(noteSchema),createNote)
noteRouter.get("/",getAllNote)

export default noteRouter