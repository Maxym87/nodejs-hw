import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Note } from './models/note.js';

const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

app.get('/notes', async (_req, res) => {
  const notes = await Note.find();
  res.status(200).json(notes);

});

app.get('/notes/:noteId', (req, res) => {
  const noteId = req.params.noteId;
  res.status(200).json({
    "message": `Retrieved note with ID: ${noteId}`
  });
});

app.get('/test-error', (req, res) => {
    throw new Error('Simulated server error');
});

app.use((req, res, next) => {
  res.status(404).json({
    "message": "Route not found"
  });
});


app.use((err, _req, res, _next) => {
  res.status(500).json({
    message: 'Internal server error',
    error: err.message
  });
});

await connectMongoDB();

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

