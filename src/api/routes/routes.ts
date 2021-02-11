import { Router } from 'express';
import { createCategoryRoute, 
	listCategoryRoute } from '../components/category/network';

const routerCategory = Router();

routerCategory.route('/category')
	.post(createCategoryRoute)
	.get(listCategoryRoute)

export default routerCategory;


