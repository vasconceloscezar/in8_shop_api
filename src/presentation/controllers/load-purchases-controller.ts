import { type LoadPurchasesByUser } from '@/domain/usecases'
import { ok, serverError } from '@/presentation/helpers'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LoadPurchasesController implements Controller {
  constructor (
    private readonly loadPurchases: LoadPurchasesByUser
  ) {}

  async handle (request: LoadPurchasesController.Request): Promise<HttpResponse> {
    try {
      const { userId } = request
      const purchases = await this.loadPurchases.loadByUserId({ userId })
      return ok({
        totalPurchases: purchases.length,
        purchases
      })
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace LoadPurchasesController {
  export type Request = {
    userId: string
  }
}
