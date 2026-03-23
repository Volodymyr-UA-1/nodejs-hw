import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectMongoDB  from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(logger);
app.use(express.json());
app.use(cors());


//маршрут, який буде повертати всі нотатки
app.use(notesRoutes);

//статус 404
app.use(notFoundHandler);

//статус 500
app.use(errorHandler);

//доступ до бази даних
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
