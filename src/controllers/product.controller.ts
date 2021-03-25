import { success, error } from '../network/response';
import Product from '../models/product.model';
import Category from '../models/category.model';

export const createProduct: Handler = async (req, res) => {
  const { name, description, price, category } = req.body;
  try {
    if (!(name && description && price && category)) {
      return error(res, 'Missing data something like name, description, category or price', 400); 
    }

    const product = new Product({
      ...req.body
    });   

    const categoryExists = await Category.findById({ _id: category });
    if (!categoryExists) {
      return error(res, "Category not found", 404);
    }

    const productExists = await Product.findOne({name});
    if(productExists) {
      return error(res, `Product with ${name} already exists`, 400);
    }
  
    await Category.findByIdAndUpdate(category, {$inc: {cuantity_products: 1} }, { new: true });

    await product.save();
    return success(res, {message: '', data: product}, 201);
  } catch (err) {
    error(res, err.message, 500);
  }
}

export const listProduct: Handler = async (req, res) => { 
  try {
    const product = await Product.find()
      .populate('category', 'name');

    if (product.length === 0) {
      return error(res, "No categories", 404);
    } else {
      return success(res, {message: '', data: product}, 200);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const updateProduct: Handler = async (req, res) => {
  const { _id, category } = req.body;

  try {
   //que exista un id en el body
    if(_id) {
      const productFound = await Product.findById(_id);

      if(!productFound) error(res, 'Product not found', 404);
  
      const changeProduct = {
         ...req.body,
         _id
      };
   
      //actualiza el producto
      const productUpdated = await Product.findByIdAndUpdate(_id, changeProduct, {new: true});
      return success(res, {message: '', data: productUpdated}, 200);  
    }

    return error(res, 'Missing data something like _id', 400);  
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const deletedProduct: Handler = async (req, res) => {
  const { _id } = req.body;
  
  try {
    const ProductFound = await Product.findById(_id);

    if (!ProductFound) return error(res, 'Category not found', 404);
    
    await Product.findByIdAndDelete(_id);
    
    return success(res, { message: 'Deleted'}, 200);
  } catch (err) {
    return error(res, err.message, 500);
  }    
}
