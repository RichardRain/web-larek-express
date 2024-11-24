import { Router } from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products';
import { validateProductUpdateBody, validateObjId } from '../middlewares/validation';

const router = Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.delete('/:productId', validateObjId, deleteProduct);
router.patch('/:productId', validateObjId, validateProductUpdateBody, updateProduct);

export default router;
