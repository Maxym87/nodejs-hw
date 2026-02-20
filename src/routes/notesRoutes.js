import { Router } from "express";
import { deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notesController.js";
import { createNote } from "../controllers/notesController.js";

const notesRoutes = Router();

notesRoutes.get('/notes', getAllNotes);
notesRoutes.get('/notes/:noteId', getNoteById);
notesRoutes.post('/notes/', createNote);
notesRoutes.delete('/notes/:noteId', deleteNote);
notesRoutes.patch('/notes/:noteId', updateNote);

export default notesRoutes;
