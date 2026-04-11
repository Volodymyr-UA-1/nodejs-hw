import multer from 'multer';
import createHttpError from 'http-errors';

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (req, file, cb) => {
    // ПЕРЕВІРКА: чи починається MIME-тип з "image/"
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      // Краще повертати помилку через createHttpError для одноманітності
      cb(createHttpError(400, 'Only images allowed.'), false);
    }
  },
});
