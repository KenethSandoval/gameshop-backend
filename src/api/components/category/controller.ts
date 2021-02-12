import { 
  createCategoryStore, 
  listCategoryStore, 
  deleteCategoryStore,
  updateCategoryStore
} from './store';

export const createCategory = async (name: string = '') => {
	try {
		name = name.trim().toLowerCase();
		if (!name) 
			throw {message: 'Missing data something like name', code: 400}
		

    const categoryAlreadyExists = (await listCategoryStore({ name })).pop()

    if (categoryAlreadyExists) 
      throw {message: `Category with name ${name} already exists`, code: 400}
    

		return await createCategoryStore(name);
	} catch (err) {
		throw err
	}
}

export const listCategory = async () => {
	let filter = {};
	try {
	  return await listCategoryStore(filter);
	} catch (err) {
	  throw err;
	}
}

export const updateCategory = async (_id:string, name: string = '') => {
  try {
    if (!_id)
      throw { message: 'You need to send an id', code: 400 }
     
    name = name.trim().toLowerCase();
    
    if (!name) 
      throw { message: 'Missing data something like name', code: 400 }

    const categoryAlreadyExists = (await listCategoryStore({name})).pop();

    if (categoryAlreadyExists)
      throw { message: `Category with ${name} already exists`, code: 400 }

    return await updateCategoryStore(_id, { name }); 

  } catch (err) {
    throw err; 
  }
}

export const deleteCategory = async (_id:string) => {
  try {
    if (!_id) {
      throw {message: 'You need to send an id', code: 400}
    }

    // Logica para borrar la categoria con el producto
    
    return await deleteCategoryStore(_id);

  } catch (err) {
    throw err;
  }
}
