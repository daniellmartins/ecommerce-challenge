import { Router } from 'express';
import { Container } from '../container/Container';
import { CartController } from '../controllers';
import { ICartService } from '../interfaces';
import { validateAddToCart, validateProductId, validateUserId, validateOptionalUserId } from '../middlewares';

const router = Router();
const container = Container.getInstance();
const cartService = container.get<ICartService>('ICartService');
const cartController = new CartController(cartService);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get shopping cart
 *     tags: [Cart]
 *     description: Returns the user's shopping cart or anonymous cart
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: false
 *         description: User ID (optional for anonymous cart)
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Cart returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', validateOptionalUserId, (req, res) => cartController.getCart(req, res));

/**
 * @swagger
 * /api/cart/add:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     description: Adds a product with specified quantity to the shopping cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddToCartRequest'
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Product not found or out of stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post('/add', validateAddToCart, (req, res) => cartController.addToCart(req, res));

/**
 * @swagger
 * /api/cart/remove/{id}:
 *   delete:
 *     summary: Remove product from cart
 *     tags: [Cart]
 *     description: Completely removes a product from the shopping cart
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to be removed
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "user123"
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Product not found in cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete('/remove/:id', validateProductId, validateUserId, (req, res) => cartController.removeFromCart(req, res));

/**
 * @swagger
 * /api/cart/update:
 *   put:
 *     summary: Update product quantity in cart
 *     tags: [Cart]
 *     description: Updates the quantity of a specific product in the cart. If quantity is 0, removes the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuantityRequest'
 *     responses:
 *       200:
 *         description: Quantity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         description: Product not found in cart or insufficient stock
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put('/update', (req, res) => cartController.updateQuantity(req, res));

export default router;
