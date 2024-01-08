export interface UserSignIn {
  email: string
  password: string
}

export interface User {
  user: {
       id: number
       email: string
       role: string
       createdAt: string
   },
   token: string // use this token as header to access the protected routes
}

export interface Customer {
  id: number
  name: string
  lastName: string
  phone: string
  avatar?: string
  createdAt: string
  userId: number
}
export interface CreateCustomer {
  name: string
  lastName: string
  phone: string
  avatar?: string
  user: UserSignIn
}

export interface UserAccount {
  id: number
  email: string
  recoveryToken: null
  role: string
  createdAt: string
  customer: Customer
}

