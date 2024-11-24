import { createOrder } from "../controllers/order";
import {Router} from 'express';

const router = Router();

router.post('/', createOrder);

export default router;