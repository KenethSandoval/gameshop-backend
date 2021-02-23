interface IPayload {
  user: {
    id: string;
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
