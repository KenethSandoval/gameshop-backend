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
