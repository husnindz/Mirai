import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { router as AuthRoutes } from './routes/auth.js';
import { router as UserRoutes } from './routes/users.js';
import { router as PredictionRoutes } from './routes/predictions.js';

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Mirai API',
  });
});

app.use('/auth', AuthRoutes);
app.use('/users', UserRoutes);
app.use('/predictions', PredictionRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// START SERVER
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
