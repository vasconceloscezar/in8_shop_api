import { type Product } from '@/domain/models'

export interface ProductProvider {
  loadProducts: () => Promise<Product[]>
  loadProductById: (id: string) => Promise<Product>
}
