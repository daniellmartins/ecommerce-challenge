import { Request, Response } from 'express';
import { ICartService } from '../interfaces';
import { ApiResponse, Cart, AddToCartRequest } from '../types';

export class CartController {
  constructor(private cartService: ICartService) {}

  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.query.userId as string;
      const effectiveUserId = userId || 'default-user';

      const cart = this.cartService.getCartByUserId(effectiveUserId);
      
      if (!cart) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cart not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Cart> = {
        success: true,
        data: cart
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const { productId, quantity, userId }: AddToCartRequest = req.body;

      if (!productId || !quantity || quantity <= 0 || !userId) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Invalid data. ProductId, quantity and userId are required'
        };
        res.status(400).json(response);
        return;
      }

      const cart = this.cartService.addToCart(userId, productId, quantity);

      if (!cart) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Product not found or error adding to cart'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Cart> = {
        success: true,
        data: cart,
        message: 'Product added to cart successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }

  async removeFromCart(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.query.userId as string;

      if (!userId) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'UserId is required'
        };
        res.status(400).json(response);
        return;
      }

      const cart = this.cartService.removeFromCart(userId, id);

      if (!cart) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Cart not found'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Cart> = {
        success: true,
        data: cart,
        message: 'Product removed from cart successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }

  async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const { productId, quantity, userId } = req.body;

      if (!productId || quantity < 0 || !userId) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Invalid data. ProductId, quantity and userId are required'
        };
        res.status(400).json(response);
        return;
      }

      const cart = this.cartService.updateQuantity(userId, productId, quantity);

      if (!cart) {
        const response: ApiResponse<null> = {
          success: false,
          error: 'Product not found in cart'
        };
        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<Cart> = {
        success: true,
        data: cart,
        message: 'Quantity updated successfully'
      };

      res.json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Internal server error'
      };
      res.status(500).json(response);
    }
  }
}
