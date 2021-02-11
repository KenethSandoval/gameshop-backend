import { createCategory, listCategory } from './controller';
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
