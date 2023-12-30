import { Customer, UserAccount } from "./user.model";

export interface OrderProduct  {
  id: number;
  amount: number;
  createdAt: string;
  orderId: number;
  productId: number;
}

export interface ProductOrder  {
  quantity: string;
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  categoryId: number;
  createdAt: string;
  OrderProduct: OrderProduct;
}


export interface OrderDetail  {
  id: number;
  status: string;
  paid: boolean;
  createdAt: string;
  customerId: number;
  customer: Customer;
  items: ProductOrder[];
}

export interface OrderResume extends Partial<OrderDetail>{}
