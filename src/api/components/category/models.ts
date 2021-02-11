import { Schema, model } from 'mongoose';

const categorySchema: Schema<ICategory> = new Schema<ICategory>({
	name: {
		type: String
	}
});

export default model<ICategory>('Category', categorySchema);
