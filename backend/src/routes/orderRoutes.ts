import { Router } from 'express';
import createOrder from '../controllers/orders';
import { createOrderValidation } from '../middlewares/validation';

const router = Router();

router.post('/order', createOrderValidation, createOrder);

export default router;
