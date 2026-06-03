import { Router } from 'express';
import {
  createPrediction,
  getPredictionHistory,
  getHistoryById,
  deleteHistoryById,
} from '../controllers/predictions.js';
import { authenticate } from '../middlewares/auth.js';
import { validateBody, checkUpSchema } from '../validators/schema.js';

const router = Router();

router.use(authenticate);

router.post('/', validateBody(checkUpSchema), createPrediction);

router.get('/history', getPredictionHistory);

router.get('/history/:id', getHistoryById);

router.delete('/history/:id', deleteHistoryById);

export { router };
