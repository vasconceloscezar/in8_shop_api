import { DbLoadPurchases } from '@/data/usecases/db-load-purchases'
import { type LoadPurchasesByUser } from '@/domain/usecases'
import { PurchaseMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadPurchases = (): LoadPurchasesByUser => {
  const purchaseMongoRepository = new PurchaseMongoRepository()
  return new DbLoadPurchases(purchaseMongoRepository)
}
