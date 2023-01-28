import { DbAddPurchase } from '@/data/usecases/db-add-purchase'
import { type AddPurchase } from '@/domain/usecases'
import { PurchaseMongoRepository } from '@/infra/db/mongodb'

export const makeDbAddPurchase = (): AddPurchase => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbAddPurchase(purchaseMongoRepository)
}
