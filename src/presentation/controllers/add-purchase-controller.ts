import { type Cart, type User } from '@/domain/models'
import { type AddPurchase } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class AddPurchaseController implements Controller {
  constructor (
    private readonly addPurchase: AddPurchase
    // private readonly loadUserByToken: LoadUserByToken
  ) {}

  async handle (request: AddPurchaseController.Request): Promise<HttpResponse> {
    try {
      const purchase = request
      await this.addPurchase.add(purchase)

      return ok({
        message: 'Purchased successful.'
      })
    } catch (err: any) {
      return serverError(err)
    }
  }
}

export namespace AddPurchaseController {
  export type Request = {
    accessToken: string
    cart: Cart
    user: User
  }

}
