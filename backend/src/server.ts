import express from 'express';
import cors from 'cors';

import productsRouter from './routes/products';
import cartRouter from './routes/cart';
import { errorHandler } from './middlewares';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

app.get('/health', (_, res) => {
  res.json({ status: 'OK', message: 'E-commerce API is running' });
});

app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);

app.use((_, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
});
