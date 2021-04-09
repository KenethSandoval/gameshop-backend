import { Schema, model } from 'mongoose';

const cardSchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true
  },
  cuantity_products: {
   type:Number,
   default:0
  }
});


