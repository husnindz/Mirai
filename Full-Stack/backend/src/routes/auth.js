import { Router } from 'express';
import { register, login, refresh, logout } from '../controllers/auth.js';
import { validateBody, registerSchema, loginSchema } from '../validators/schema.js';

export const router = Router();

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.post('/refresh', refresh);
router.post('/logout', logout);
