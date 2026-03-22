import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectMongoDB  from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';





const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());


//маршрут, який буде повертати всі нотатки
app.get('/notes', (req, res) => {
  res.status(200).json({ "message": "Retrieved all notes" });
});

//маршрут, який буде повертати одну нотатку за її ідентифікатором
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;
  res.status(200).json({ "message": `Retrieved note with ID: ${noteId}` });
});

//створення нотатки notes
app.post('/notes,',(req, res) => {
  res.status(201).json({ message: 'notes created' });
});

//оновлення нотатки notes за Id
app.patch('/notes/:noteId', (req, res) => {
  res.status(200).json({ message: 'note update' });
});

//видалення нотатки notes за Id
app.delete('/notes/:noteId', (req, res) => {
  res.status(200).json({ message: 'note delete' });
});

//статус 404
app.use(notFoundHandler);

//статус 500
app.use(errorHandler);

//доступ до бази даних
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`✅ MongoDB connection established successfully`);
});
