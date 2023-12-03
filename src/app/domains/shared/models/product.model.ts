export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: string
  categoryId: number
  createdAt: string
  category: {
      id: number
      name: string
      image: string
      createdAt: string
  }
}
