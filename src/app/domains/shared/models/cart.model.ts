import { Product } from "./product.model";

export type CartItemType = Product & { quantity: number, price: number};

 export type CartState = {
  [key: string]: CartItemType;
};
