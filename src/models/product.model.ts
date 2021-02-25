import { Schema, model } from 'mongoose';

const productSchema: Schema<IProduct> = new Schema({
  name: String,
  description: String,
  cuantity: {
   type: Number,
   required: true
  },
  sales:{
    type: Number,
    required: true,
    default: 0
  },
  prices: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }
});

export default model<IProduct>('Product', productSchema);
