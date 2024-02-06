import { faker } from '@faker-js/faker';
import { CreateOrder, OrderResume } from './order.model';

export const generateOneOrder = (): OrderResume => {
    return {
        id: faker.number.int(),
         paid: faker.datatype.boolean(),
         status: faker.string.alpha(),
         createdAt: `${faker.date.anytime()}` 
    }
}

export const generateOrders = (size = 9): OrderResume[] => {
    const orders: OrderResume[] = []
    for( let index = 0; index < size; index++ ) {
        orders.push(generateOneOrder())
    }
    return[...orders]
}