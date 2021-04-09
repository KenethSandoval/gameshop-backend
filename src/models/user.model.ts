import { Schema, model } from 'mongoose';

const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  rol: {
    type: String,
    require: true,
    default: 'USER_ROL' 
  }
});

export default model<IUser>('User', userSchema);


