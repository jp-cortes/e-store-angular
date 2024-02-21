import { faker } from '@faker-js/faker';
import { generateOneProduct } from './product.mock';
import { CartItemType } from './cart.model';

export const generateCartItem = (): CartItemType => {
    const product = generateOneProduct();

    return {
        ...product,
        quantity: faker.number.int(),
        price: faker.number.float({ min: 10, max: 900, fractionDigits: 2}),
    }
}

export const generateCartItems =  (size = 9): CartItemType[] => {
    const items: CartItemType[] = [];
    for (let index = 0; index < size; index++) {
        items.push(generateCartItem())
    }
    return [...items];
    }