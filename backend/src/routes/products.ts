import { Router } from 'express';
import { Container } from '../container/Container';
import { ProductController } from '../controllers';
import { IProductService } from '../interfaces';
import { validateProductId } from '../middlewares';

const router = Router();
const container = Container.getInstance();
const productService = container.get<IProductService>('IProductService');
const productController = new ProductController(productService);

router.get('/', (req, res) => productController.getAllProducts(req, res));
router.get('/:id', validateProductId, (req, res) => productController.getProductById(req, res));

export default router;
