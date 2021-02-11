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
