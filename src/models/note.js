import { Schema } from 'mongoose';
import { model } from 'mongoose';
import { TAGS } from '../constants/tags.js';


const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: false,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      // Використовуємо константу замість масиву
      enum: TAGS,
      default: 'Todo',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ВАЖЛИВО: Додаємо текстовий індекс для роботи фільтрації за параметром 'search'
// Це дозволить MongoDB шукати слова одночасно в заголовку та змісті
noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('note', noteSchema);
