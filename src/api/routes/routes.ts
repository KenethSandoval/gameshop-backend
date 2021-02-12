import { Router } from 'express';
import { 
  createCategoryRoute, 
	listCategoryRoute,
  deleteCategoryRoute,
  updateCategoryRoute
} from '../components/category/network';

const routerCategory = Router();

routerCategory.route('/category')
	.post(createCategoryRoute)
	.get(listCategoryRoute)
  .put(updateCategoryRoute)
  .delete(deleteCategoryRoute)

export default routerCategory;


