import { Router } from 'express';
import { 
  createCategory,
  listCategory,
  updateCategory,
  deleteCategory,

  createProduct,
  listProduct,
  updateProduct,
  deletedProduct
} from '../controllers';

const router = Router();

router.route('/category')
  .get(listCategory)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory)


router.route('/product')
  .post(createProduct)
  .get(listProduct)
  .put(updateProduct)
  .delete(deletedProduct)

export default router;

