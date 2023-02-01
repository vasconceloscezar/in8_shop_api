import { AddPurchaseController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbAddPurchase } from '@/main/factories/usecases/make-db-add-purchase-factory'

export const makeAddPurchaseController = (): Controller => {
  const dbAddPurchase = makeDbAddPurchase()
  const controller = new AddPurchaseController(dbAddPurchase)
  return controller
}
