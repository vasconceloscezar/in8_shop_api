import { type Product } from '@/domain/models'
import env from '@/main/config/env'
import { type ProductProvider, type RequestResponse } from '../protocols'

export type ProductEuropeanProvider = {
  hasDiscount: boolean
  name: string
  gallery: string[]
  description: string
  price: string
  discountValue: string
  details: {
    adjective: string
    material: string
  }
  id: string
}

export class EuropeanProvider implements ProductProvider {
  constructor (private readonly get: (url: string) => Promise<RequestResponse>) {}

  private parseProduct (product: ProductEuropeanProvider): Product {
    const productParsed = {
      id: `${product.id}-EU`,
      name: product.name,
      description: product.description,
      hasDiscount: product.hasDiscount,
      images: product.gallery,
      price: parseFloat(product.price),
      details: {
        ...product.details
      },
      discountValue: parseFloat(product.discountValue)
    }
    return productParsed
  }

  async loadProducts (): Promise<Product[]> {
    try {
      const data = await this.get(env.providersURL.european).then(res => res.data)
      const mappedProducts = data.map((product: ProductEuropeanProvider) => {
        if (!product.name) return null
        return this.parseProduct(product)
      })
      return mappedProducts.filter((product: Product) => product !== null)
    } catch (error) {
      console.error('Problem loading european products', error.message)
      return []
    }
  }

  async loadProductById (id: string): Promise<any> {
    const data = await this.get(`${env.providersURL.european}/${id}`).then(res => res.data)
    return data
  }
}
