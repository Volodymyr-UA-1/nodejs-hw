import { Schema } from 'mongoose';
import { model } from 'mongoose';

const noteSchema = new Schema(
  {

    title: {
      String,
    required: true,
    trim: true, // прибирає пробіли на початку та в кінці
  },
    content: {
      type: String,
      required: false,
      default: '', // за замовчуванням порожній рядок
      trim: true,
    },
    tag: {
      type: String,
      required: true,
      enum: ['Work', 'Personal', 'Meeting', 'Shopping', 'Ideas', 'Travel', 'Finance', 'Health', 'Important', 'Todo'],
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
export const Note = model('note', noteSchema);
