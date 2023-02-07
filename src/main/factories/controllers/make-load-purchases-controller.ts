import { type Controller } from '@/presentation/protocols'
import { makeDbLoadPurchases } from '../usecases'
import { LoadPurchasesController } from '@/presentation/controllers/load-purchases-controller'

export const makeLoadPurchasesController = (): Controller => {
  const dbLoadPurchases = makeDbLoadPurchases()
  const controller = new LoadPurchasesController(dbLoadPurchases)
  return controller
}
