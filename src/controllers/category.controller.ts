import { success, error } from '../network/response';
import Category from '../models/category.model';

export const createCategory: Handler = async (req, res) => {
  const {name} = req.body;

  if (name) {
    try {
      const categoryAdd = new Category({
        ...req.body
      });
      
      const categoryExists = await Category.findOne({name});

      if (categoryExists) {
       return error(res, `Category with name ${name} already exists`, 400)
      }
      
      await categoryAdd.save();

      return success(res, {message: '', data: categoryAdd}, 201);
      
    } catch (err) {
      return error(res, `Error: ${err.message}`, 500);
    }
  } else {
   return error(res, 'Enter all data', 400);
  }
}
