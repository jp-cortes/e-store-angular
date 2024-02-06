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

export interface OrderResume {
  id: number;
  status: string;
  paid: boolean;
  createdAt: string;
}

export interface CreateOrder extends Omit<OrderResume, 'id' | 'createdAt'> {}

export interface OrderDetail extends OrderResume  {
  customerId: number;
  customer: Customer;
  items: ProductOrder[];
}

