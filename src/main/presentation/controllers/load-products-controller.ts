import { type ProductProvider } from '@/data/protocols'
import { ok, serverError } from '../helpers/http-helper'
import { type Controller, type HttpResponse } from '../protocols'

export class LoadProductsController implements Controller {
  constructor (
    private readonly productProviders: ProductProvider[]
  ) {}

  async handle (request: any): Promise<HttpResponse> {
    try {
      const products = await Promise.all(this.productProviders.map(async provider => provider.loadProducts()))

      return ok({
        products
      })
    } catch (err: any) {
      return serverError(err)
    }
  }
}
