import { success, error } from '../network/response';
import Category from '../models/category.model';

export const listCategory: Handler = async (req, res) => {
  try {
    const enterprise = await Category.find();

    if (enterprise.length === 0) {
      return error(res, "No categories", 404);
    } else {
      return success(res, {message: '', data: enterprise}, 200);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const createCategory: Handler = async (req, res) => {
  const {name} = req.body;

  if (name) {
    try {
      
      const categoryExists = await Category.findOne({name});

      if (categoryExists) {
       return error(res, `Category with name ${name} already exists`, 400)
      }
      
      const categoryAdd = new Category({
        ...req.body
      });
      
      await categoryAdd.save();

      return success(res, {message: '', data: categoryAdd}, 201);
      
    } catch (err) {
      return error(res, `Error: ${err.message}`, 500);
    }
  } else {
   return error(res, 'Enter all data', 400);
  }
}

export const updateCategory: Handler = async (req, res) => {
  const { _id } = req.body;

  try {
    const categoryFound = await Category.findById(_id);
    if(!categoryFound) {
      return error(res, 'Category not found', 404);
    }

    const categoryUpdate = await Category.findByIdAndUpdate(_id, req.body, {new: true});
    
    return success(res, { message: '', data: categoryUpdate }, 200);

  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const deleteCategory: Handler = async (req, res) => {
  const { _id } = req.body;
  
  try {
    const categoryFound = await Category.findById(_id);
    if (!categoryFound) {
      return error(res, 'Category not found', 404);
    }

    await Category.findByIdAndDelete(_id);
    
    return success(res, { message: 'Deleted'}, 200);
  } catch (err) {
    return error(res, err.message, 500);
  }
}
