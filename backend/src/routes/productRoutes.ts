import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/products';
import { createProductValidation } from '../middlewares/validation';

const router = Router();

router.get('/product', getProducts);
router.post('/product', createProductValidation, createProduct);

export default router;
