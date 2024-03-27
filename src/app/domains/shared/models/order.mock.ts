import { faker } from '@faker-js/faker';
import {
  ItemAdded,
  OrderDetail,
  OrderOfProduct,
  OrderResume,
  ProductOrder,
} from './order.model';
import { generateCustomer } from './user.mock';

export const generateOneOrder = (): OrderResume => {
  return {
    id: faker.number.int(),
    paid: faker.datatype.boolean(),
    status: faker.string.alpha(),
    createdAt: `${faker.date.anytime()}`,
  };
};

export const generateOneOrderProduct = (): OrderOfProduct => {
  return {
    id: faker.number.int(),
    amount: faker.number.int(),
    createdAt: `${faker.date.anytime()}`,
    orderId: faker.number.int(),
    productId: faker.number.int(),
  };
};

export const generateProductOrder = (): ProductOrder => {
  return {
    quantity: `${faker.number.int()}`,
    id: faker.number.int(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    price: `${faker.commerce.price()}`,
    categoryId: faker.number.int(),
    createdAt: `${faker.date.anytime()}`,
    OrderProduct: generateOneOrderProduct(),
  };
};

export const generateItemAdded = (): ItemAdded => {
  return {
    id: faker.number.int(),
    orderId: faker.number.int(),
    productId: faker.number.int(),
    createdAt: `${faker.date.anytime()}`,
    amount: faker.number.int(),
  };
};

export const generateOrderItems = (size = 9): ProductOrder[] => {
  const items: ProductOrder[] = [];
  for (let index = 0; index < size; index++) {
    items.push(generateProductOrder());
  }
  return [...items];
};

export const generateOrders = (size = 9): OrderResume[] => {
  const orders: OrderResume[] = [];
  for (let index = 0; index < size; index++) {
    orders.push(generateOneOrder());
  }
  return [...orders];
};

export const generateOrderDetail = (): OrderDetail => {
  return {
    id: faker.number.int(),
    status: faker.string.alpha(10),
    paid: faker.datatype.boolean(),
    createdAt: `${faker.date.anytime()}`,
    customerId: faker.number.int(),
    customer: generateCustomer(),
    items: generateOrderItems(),
  };
};