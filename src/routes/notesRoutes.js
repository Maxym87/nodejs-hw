import { Router } from "express";
import { getAllNotes } from "../controllers/notesController.js";
import { getNoteById } from "../controllers/notesController.js";
const notesRoutes = Router();

notesRoutes.get('/notes', getAllNotes);

notesRoutes.get('/notes/:noteId', getNoteById);

notesRoutes.get('/test-error', (req, res) => {
    throw new Error('Simulated server error');
});


export default notesRoutes;
