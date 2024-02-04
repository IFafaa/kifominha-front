export interface IFood {
  _id: string;
  restaurant_id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  serve: number;
  category: {
    name: string;
    _id: string;
  };
}
