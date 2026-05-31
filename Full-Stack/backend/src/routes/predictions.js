import { Router } from 'express';
import { createPrediction, getPredictionHistory } from '../controllers/predictions.js';
import { authenticate } from '../middlewares/auth.js';
import { validateBody, checkUpSchema } from '../validators/schema.js';

const router = Router();

// Authenticated routes (requires Bearer token)
router.use(authenticate);

// Run prediction and save check-up along with predicted risks to database
router.post('/', validateBody(checkUpSchema), createPrediction);

// Retrieve all historical check-ups and predicted risks for authenticated user
router.get('/history', getPredictionHistory);

export { router };
