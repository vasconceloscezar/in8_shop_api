import { type ProductProvider } from '@/data/protocols'
import { type Product } from '@/domain/models'
import { sortProductsById } from '@/utils/sorter'
import { ok, serverError } from '../helpers/http-helper'
import { type PaginationOptions, type Controller, type HttpResponse } from '../protocols'

export class LoadProductsController implements Controller {
  constructor (
    private readonly productProviders: ProductProvider[]
  ) {}

  async handle (request: LoadProductsController.Request): Promise<HttpResponse> {
    try {
      const { limit = '20' , page = '1' , name, id, description } = request
      let products = await this.loadProductsFromAllProviders()
      products = sortProductsById(products)
      const filters = {
        name, id, description
      }
      const filteredProducts = this.filterProducts(products, filters)
      const paginateOptions = {
        limit: limit ? parseInt(limit) : 20,
        page: limit ? parseInt(page) : 1
      }
      const paginatedProducts = this.paginateProducts(filteredProducts,paginateOptions)
      return ok({
        totalProducts: filteredProducts.length,
        products: paginatedProducts
      })
    } catch (err: any) {
      return serverError(err)
    }
  }

  private async loadProductsFromAllProviders (): Promise<Product[]> {
    console.time('load-products')
    const products = await Promise.all(this.productProviders.map(async provider => provider.loadProducts()))
    console.timeEnd('load-products')
    return products.flat()
  }

  private filterProducts (products: Product[], filters: Record<string, any>): Product[] {
    console.time('filter-products')
    for (const [key, value] of Object.entries(filters)) {
      if (!value) continue
      const regexMatch = new RegExp(value, 'i')
      products = products.filter(product => {
        return regexMatch.test(product[key])
      })
    }
    console.timeEnd('filter-products')
    return products
  }

  private paginateProducts (products: Product[], options: PaginationOptions): Product[] {
    const startIndex = (options.page - 1) * options.limit
    const endIndex = options.page * options.limit
    return products.slice(startIndex, endIndex)
  }
}

export namespace LoadProductsController {
  export type Request = {
    page?: string
    limit?: string
    name?: string
    id?: string
    description?: string
  }

}
