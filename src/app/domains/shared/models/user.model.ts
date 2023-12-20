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
