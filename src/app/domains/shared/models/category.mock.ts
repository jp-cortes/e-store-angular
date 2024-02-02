import { faker } from '@faker-js/faker';
import { Category } from './category.model';
import { generateProducts } from './product.mock';

export const generateOneCategory =  (): Category => {
    return {
        id: faker.number.int(),
        name: faker.commerce.department(),
        image: faker.image.url(),
        createdAt:`${faker.date.anytime()}`,
        // products: generateProducts(),
        }
}

export const generateCategories =  (size = 9): Category[] => {
const categories: Category[] = [];
for (let index = 0; index < size; index++) {
    categories.push(generateOneCategory())
}
return [...categories];
}