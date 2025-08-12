import { Router } from 'express';

import { findProductById, mockProducts } from '../data/products';
import { ApiResponse, Product } from '../types';

const router = Router();

router.get('/', (_, res) => {
  try {
    const response: ApiResponse<Product[]> = {
      success: true,
      data: mockProducts
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const product = findProductById(id);

    if (!product) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Product not found'
      };
      return res.status(404).json(response);
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product
    };

    res.json(response);
  } catch (error) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Internal server error'
    };
    res.status(500).json(response);
  }
});

export default router;
