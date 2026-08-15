import { Router } from "express";
import { createNote, getAllNote } from "../controllers/note.controller.js";

const noteRouter = Router()

noteRouter.post("/",createNote)
noteRouter.get("/",getAllNote)

export default noteRouter