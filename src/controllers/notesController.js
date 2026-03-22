import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

//отримати  всі нотатки
export const getAllNotes = async (req, res) => {
    const allNotes = await Note.find();
    res.status(200).json(allNotes);
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
