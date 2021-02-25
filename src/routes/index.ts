import { Router } from 'express';
import { 
  createCategory,
  listCategory,
  updateCategory,
  deleteCategory,

  createProduct
} from '../controllers';

const router = Router();

router.route('/category')
  .get(listCategory)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory)


router.route('/product')
  .post(createProduct)

export default router;

