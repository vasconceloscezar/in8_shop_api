import { type Product } from '@/domain/models'

export function sortProductsById (products: Product[], order = 'ascend'): Product[] {
  // Since IDs have a suffix ending with its origin, we will remove before sorting
  return products.sort((a, b) => {
    const idA = parseInt(a.id.split('-')[0])
    const idB = parseInt(b.id.split('-')[0])
    if (order === 'ascend') return idA - idB
    return idB - idA
  })
}
