export type Product = {
  id: string
  hasDiscount: boolean
  name: string
  images: string[]
  description: string
  price: number
  details?: Details
  discountValue?: number
}

export interface Details {
  departament: string
  adjective: string
  material: string
}
