import { type Cart } from './cart'
import { type User } from './user'

export type Purchase = {
  id: string
  cart: Cart
  user: User
}
