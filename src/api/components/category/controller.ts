import { createCategoryStore, listCategoryStore } from './store';

export const createCategory = async (name: string) => {
	try {
		const nameExists = name.toString();
		if (!nameExists) {
			throw {message: 'Missing data something like name', code: 400}
		}

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
