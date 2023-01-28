export type Cart = {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

export type CartItem = {
  productId: string
  price: number
  quantity: number
}
