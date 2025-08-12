import { Router } from 'express';
import { Container } from '../container/Container';
import { CartController } from '../controllers';
import { ICartService } from '../interfaces';
import { validateAddToCart, validateProductId, validateUserId, validateOptionalUserId } from '../middlewares';

const router = Router();
const container = Container.getInstance();
const cartService = container.get<ICartService>('ICartService');
const cartController = new CartController(cartService);

router.get('/', validateOptionalUserId, (req, res) => cartController.getCart(req, res));
router.post('/add', validateAddToCart, (req, res) => cartController.addToCart(req, res));
router.delete('/remove/:id', validateProductId, validateUserId, (req, res) => cartController.removeFromCart(req, res));
router.put('/update', (req, res) => cartController.updateQuantity(req, res));

export default router;
