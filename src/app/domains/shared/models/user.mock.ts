import { faker } from '@faker-js/faker';
import { User } from './user.model';


export const generateUser = (): User => {
  return {
    user: {
      id: faker.number.int(),
      email: faker.internet.email(),
      role: faker.person.jobTitle(), // should be customer, admin, seller.
      createdAt: `${faker.date.anytime()}`,
    },
    token: faker.string.uuid(),
  };
};
