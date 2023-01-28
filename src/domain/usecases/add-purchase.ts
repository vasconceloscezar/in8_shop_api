import { type Cart } from '../models/cart'
import { type User } from '../models/user'

export interface AddPurchase {
  add: (data: AddPurchase.Params) => Promise<void>
}

export namespace AddPurchase {
  export type Params = {
    cart: Cart
    user: User
  }

}
