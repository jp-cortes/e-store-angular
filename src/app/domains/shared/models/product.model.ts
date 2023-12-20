import { Category } from './category.model'

export interface Product {
  id: number
  name: string
  description: string
  image: string
  price: string
  categoryId: number
  createdAt: string
  category : Category
}
