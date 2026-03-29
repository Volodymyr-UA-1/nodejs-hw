import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//отримати  всі нотатки
export const getAllNotes = async (req, res, next) => {
  try {
    // 1. Отримуємо всі можливі параметри з query
    const {
      tag,
      search,
      page = 1,
      perPage = 10
    } = req.query;

    // Перетворюємо рядки у числа
    const limit = parseInt(perPage);
    const skip = (parseInt(page) - 1) * limit;

    const filter = {};

    // 2. Логіка фільтрації (залишається з попереднього завдання)
    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    // 3. Виконуємо два запити паралельно:
    // один для самих нотаток з пагінацією, інший для підрахунку загальної кількості
    const [notes, totalNotes] = await Promise.all([
      Note.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }), // опціонально: нові зверху
      Note.countDocuments(filter),
    ]);

    // 4. Розраховуємо загальну кількість сторінок
    const totalPages = Math.ceil(totalNotes / limit);

    // 5. Формуємо відповідь згідно з ТЗ
    res.status(200).json({
      page: parseInt(page),
      perPage: limit,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

//отримати нотатку за id
export const getNoteById = async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) {

        //Виклик throw new Error() передає управління нашій error middleware
        // і припиняє виконання коду поточної функції.
        throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
};

//створити нотатку
export const createNote = async (req, res) => {
    const note = await Note.create(req.body);
    res.status(201).json(note);
};

//видалити нотатку
export const deleteNote = async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findOneAndDelete({
        _id: noteId,
    });
    if (!note) {
        throw createHttpError(404, 'Note not Found');
    }
    res.status(200).json(note);
};

//оновити нотатку
export const updateNote = async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findOneAndUpdate(
        { _id: noteId },
        req.body,
        { returnDocument: 'after' },
    );
    if (!note) {
        throw createHttpError(404, 'Note not Found');
    }
    res.status(200).json(note);
};
