import { Router } from 'express';
import { 
  createCategory,
  listCategory,
  updateCategory,
  deleteCategory,

  createProduct,
  listProduct,
  updateProduct,
  deletedProduct,

  createUser
} from '../controllers';

import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.route('/category')
  .get(verifyToken, listCategory)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory)


router.route('/product')
  .post(createProduct)
  .get(listProduct)
  .put(updateProduct)
  .delete(deletedProduct)

router.route('/user')
  .post(createUser)

export default router;

