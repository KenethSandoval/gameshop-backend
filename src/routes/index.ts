import { Router } from 'express';
import { 
  createCategory,
  listCategory,
  updateCategory,
  deleteCategory  
} from '../controllers';

const router = Router();

router.route('/category')
  .get(listCategory)
  .post(createCategory)
  .put(updateCategory)
  .delete(deleteCategory)

export default router;

