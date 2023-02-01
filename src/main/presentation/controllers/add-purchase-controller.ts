import { type Cart, type User } from '@/domain/models'
import { type AddPurchase } from '@/domain/usecases'
import { ok, serverError } from '@/main/presentation/helpers/http-helper'
import { type Controller, type HttpResponse } from '@/main/presentation/protocols'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly addPurchase: AddPurchase
  ) {}

  async handle (request: AddPurchaseController.Request): Promise<HttpResponse> {
    try {
      // const { limit = '20' , page = '1' , name, id, description } = request
      console.log(request)
      const purchase = request
      await this.addPurchase.add(purchase)

      return ok({
        totalProducts: 'filteredProducts.length',
        products: 'paginatedProducts'
      })
    } catch (err: any) {
      return serverError(err)
    }
  }
}

export namespace AddPurchaseController {
  export type Request = {
    cart: Cart
    user: User
  }

}
