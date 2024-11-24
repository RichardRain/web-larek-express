import { getProducts, createProduct } from "../controllers/products";
import {Router} from 'express';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);

export default router;