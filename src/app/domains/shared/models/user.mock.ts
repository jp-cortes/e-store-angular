import { faker } from '@faker-js/faker';
import { Customer, CustomerProfile, EmailResponse, NewCustomer, User, UserAccount } from './user.model';


export const generateSignInUser = (): User => {
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

export const generateCustomerProfile = (): CustomerProfile  => {
  return {
    id: faker.number.int(),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    avatar: faker.image.avatar(),
    createdAt: `${faker.date.anytime()}`,
    userId: faker.number.int(),
  };
};

export const generateCustomer = (): Customer => {
  return {
    userId: `${faker.number.int()}`,
    id: `${faker.number.int()}`,
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: `${faker.phone.number()}`,
    avatar: faker.image.avatar(),
    user: {
      email: faker.internet.email(),
      password: faker.string.alphanumeric(),
      role: faker.person.jobTitle(), // should be customer, admin, seller.
      createdAt: `${faker.date.anytime()}`,
    },
    token: faker.string.uuid(),
  };
};

export const generateSignUpCustomer = (): NewCustomer => {
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: `${faker.phone.number()}`,
    user: {
      email: faker.internet.email(),
      password: faker.string.alphanumeric(),
      role: faker.person.jobTitle(), // should be customer, admin, seller.
    }
  };
};

export const generateUserAccount = (): UserAccount  => {
  return {
    id: faker.number.int(),
      email: faker.internet.email(),
      role: faker.person.jobTitle(), // should be customer, admin, seller.
      createdAt: `${faker.date.anytime()}`,
      customer: generateCustomerProfile(),
      recoveryToken: null,

  };
};

export const generateEmailResponse = (): EmailResponse =>  {
return {
  message: faker.lorem.text()
};
}
