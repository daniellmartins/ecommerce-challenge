import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const validateAddToCart = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { productId, quantity, userId } = req.body;

  if (!productId || typeof productId !== 'string') {
    const response: ApiResponse<null> = {
      success: false,
      error: 'ProductId is required and must be a string'
    };
    res.status(400).json(response);
    return;
  }

  if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Quantity is required and must be a positive number'
    };
    res.status(400).json(response);
    return;
  }

  if (!userId || typeof userId !== 'string') {
    const response: ApiResponse<null> = {
      success: false,
      error: 'UserId is required and must be a string'
    };
    res.status(400).json(response);
    return;
  }

  next();
};

export const validateProductId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  console.log(id)

  if (!id || id.trim() === '') {
    const response: ApiResponse<null> = {
      success: false,
      error: 'Product ID is required and must be a string'
    };
    res.status(400).json(response);
    return;
  }

  next();
};

export const validateUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.query.userId as string;

  if (!userId || userId.trim() === '') {
    const response: ApiResponse<null> = {
      success: false,
      error: 'UserId is required and must be a string'
    };
    res.status(400).json(response);
    return;
  }

  next();
};

export const validateOptionalUserId = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = req.query.userId as string;

  if (userId && userId.trim() === '') {
    const response: ApiResponse<null> = {
      success: false,
      error: 'UserId must be a valid string if provided'
    };
    res.status(400).json(response);
    return;
  }

  next();
};
