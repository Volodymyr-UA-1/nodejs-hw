import { Router } from 'express';
import { celebrate } from 'celebrate';

import { loginUser, logoutUser, refreshUserSession, registerUser } from '../controllers/authController.js';
import { registerUserSchema,loginUserSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
// logout НЕ потребує celebrate, бо немає body
router.post('/auth/logout', logoutUser);
// оновлення сесії (refresh)
router.post('/auth/refresh', refreshUserSession);
export default router;
