import { type ProductProvider } from '@/data/protocols'
import { type Product } from '@/domain/models'
import { ok, serverError } from '../helpers/http-helper'
import { type Controller, type HttpResponse } from '../protocols'

export class LoadProductsController implements Controller {
  constructor (
    private readonly productProviders: ProductProvider[]
  ) {}

  async loadProductsFromAllProviders (): Promise<Product[]> {
    const products = await Promise.all(this.productProviders.map(async provider => provider.loadProducts()))
    return products.flat()
  }

  async handle (request: any): Promise<HttpResponse> {
    try {
      const products = await this.loadProductsFromAllProviders()

      return ok({
        totalProducts: products.length,
        products
      })
    } catch (err: any) {
      return serverError(err)
    }
  }
}
