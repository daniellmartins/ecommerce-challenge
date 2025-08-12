import express from 'express';
import cors from 'cors';
import productsRouter from '../../src/routes/products';
import cartRouter from '../../src/routes/cart';
import { errorHandler } from '../../src/middlewares';

export function createTestApp() {
  const app = express();

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

  return app;
}
