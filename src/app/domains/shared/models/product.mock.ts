import { faker } from '@faker-js/faker';
import { Product } from './product.model';
import { Category } from './category.model';
import { generateOneCategory } from './category.mock';

export const generateOneProduct =  (): Product => {
    return {
        id: faker.number.int(100),
        name: faker.commerce.product(),
        image: faker.image.url(),
        description: faker.commerce.productDescription(),
        price: faker.number.int({min: 100, max: 1000}),
        createdAt:`${faker.date.anytime()}`,
        categoryId: faker.number.int(100),
        category: generateOneCategory(),
        }
}

export const generateProducts =  (size = 9): Product[] => {
const products: Product[] = [];
for (let index = 0; index < size; index++) {
    products.push(generateOneProduct())
}
return [...products];
}



export const productsByCategory =  (): Category => {
    return {
        id: faker.number.int(),
        name: faker.commerce.department(),
        image: faker.image.url(),
        createdAt:`${faker.date.anytime()}`,
        products: generateProducts(),
        }
}