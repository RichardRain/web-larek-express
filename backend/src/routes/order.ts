import { Router } from 'express';
import createOrder from '../controllers/order';
import { validateOrderBody } from '../middlewares/validation';

const router = Router();

router.post('/', validateOrderBody, createOrder);

export default router;
