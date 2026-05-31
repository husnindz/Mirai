import { Router } from 'express';
import { createPrediction, getPredictionHistory } from '../controllers/predictions.js';
import { authenticate } from '../middlewares/auth.js';

const router = Router();

// Authenticated routes (requires Bearer token)
router.use(authenticate);

// Run prediction and save check-up along with predicted risks to database
router.post('/', createPrediction);

// Retrieve all historical check-ups and predicted risks for authenticated user
router.get('/history', getPredictionHistory);

export { router };
