import { type ProductProvider } from '@/data/protocols'
import { type Product } from '@/domain/models'
import { sortProductsById } from '@/utils/sorter'
import { ok, serverError } from '../helpers/http-helper'
import { type Controller, type HttpResponse } from '../protocols'

export class LoadProductsController implements Controller {
  constructor (
    private readonly productProviders: ProductProvider[]
  ) {}

  private async loadProductsFromAllProviders (): Promise<Product[]> {
    const products = await Promise.all(this.productProviders.map(async provider => provider.loadProducts()))
    return sortProductsById(products.flat())
  }

  async handle (request: LoadProductsController.Request): Promise<HttpResponse> {
    try {
      const { query } = request
      console.log(query)
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

export namespace LoadProductsController {
  export type Request = {
    query?: {
      limit: number
      name: string

    }
  }
}
