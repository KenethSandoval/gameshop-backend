import { 
  createCategory, 
  deleteCategory, 
  listCategory,
  updateCategory
} from './controller';

import { Request, Response } from 'express';
import * as response from '../../../network/response';

export const createCategoryRoute = async (req: Request, res: Response) => {
	const {name} = req.body;

	try {
	  const categoryAdded = await createCategory(name);
	  response.success(res, { message: '', data: categoryAdded }, 201);
	} catch (err) {
	  response.error(res, err.message, 500);
	}
}


export const listCategoryRoute = async (req: Request, res: Response) => {
	try {
	  const categoryFound = await listCategory();
	  response.success(res, { message: '', data: categoryFound }, 200);
	} catch (err) {
	  response.error(res, err.message, err.code);
	}
}

export const updateCategoryRoute = async (req: Request, res: Response) => {
  const {_id, name} = req.body;
   
  try {
    const categoryUpdated = await updateCategory(_id, name);
    response.success(res, { message: '', data: categoryUpdated }, 201);
  } catch (err) {
    console.log(err.code);
    response.error(res, err.message, 400);
  }
}

export const deleteCategoryRoute = async (req: Request, res: Response) => {
  const { _id } = req.body;
  try {
    await deleteCategory(_id);
    response.success(res, {message: 'Deleted'}, 200);
  } catch (err) {
    response.error(res, err.message, 500);
  }
}
