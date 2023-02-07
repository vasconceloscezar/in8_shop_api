import { type Product } from './product'

export type Cart = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export type CartItem = {
  Product: Product
  price: number
  quantity: number
}
