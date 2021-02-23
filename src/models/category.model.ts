import { Schema, model } from 'mongoose';

const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true
  },
  cuantity_products: {
   type:Number,
   default:0
  }
});

export default model<ICategory>('Category', categorySchema);
