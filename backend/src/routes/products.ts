import { Router } from 'express';
import { Container } from '../container/Container';
import { ProductController } from '../controllers';
import { IProductService } from '../interfaces';
import { validateProductId } from '../middlewares';

const router = Router();
const container = Container.getInstance();
const productService = container.get<IProductService>('IProductService');
const productController = new ProductController(productService);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     description: Returns a list of all products available in the catalog
 *     responses:
 *       200:
 *         description: Products list returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/', (req, res) => productController.getAllProducts(req, res));

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     description: Returns the details of a specific product based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique product ID
 *         schema:
 *           type: string
 *           example: "1"
 *     responses:
 *       200:
 *         description: Product found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get('/:id', validateProductId, (req, res) => productController.getProductById(req, res));

export default router;
