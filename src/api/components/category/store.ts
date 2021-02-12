import Category from './models';

export const createCategoryStore = async (name: string) => {	
	
	try {
		const categoryFind = await Category.findOne({ name });

		if (categoryFind) {
			throw {message: `Category with name ${name} already exists `}
		}

		const categorySave = new Category({
			name
		});

		return await categorySave.save(); 
	} catch (err) {
		throw err;
	}
}

export const listCategoryStore = async (filter: Object) => {
	try {
		return await Category.find(filter);
	} catch (err) {
		throw err;
	}
}

export const updateCategoryStore = async (_id: string, categoryToUpdated: Object) => {

  try {
    const categoryUpdated = await Category.findByIdAndUpdate(_id, categoryToUpdated, {new: true});

    if (!categoryUpdated)
      throw {message: `Category with id ${_id} not exists`, code: 404}
  
    return categoryUpdated

  } catch(err) {
    throw err;
  }
}

export const deleteCategoryStore = async (_id: string) => {
  try{
    const categoryDelete = await Category.findByIdAndDelete(_id);
    if (!categoryDelete) {
      throw {message: `Category with id ${_id} not exists`, code: 404} 
    }
    return categoryDelete;

  } catch (err) {
    throw err;
  }
}
