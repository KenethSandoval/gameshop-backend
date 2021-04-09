interface IPayload {
  user: {
    id: string;
    rol: string;
  };
}

interface ICategory extends TMongoDocument {
  name: string;
  cuantity_products: number;
}

interface IProduct extends TMongoDocument {
  name: string;
  description: string;
  cuantity: number;
  sales: number;
  price: number;
  category: TMongoId[];
}

interface ICart extends TMongoDocument {
  name: TMongoId[];
  product: TMongoId[];
}

interface IUser extends TMongoDocument {
  name: string;
  lastname: string
  email: string;
  password: string;
  rol: string;
}
