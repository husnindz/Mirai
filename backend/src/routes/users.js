import { Router } from 'express';
import getAllUser, { getUserById } from '../controllers/users.js';
import { authenticate } from '../middlewares/auth.js';

export const router = Router();

router.use(authenticate);

router.get('/', getAllUser);
router.get('/:id', getUserById);
