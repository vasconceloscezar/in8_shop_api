import { type AddPurchaseRepository } from '@/data/protocols/db/purchases'
import { MongoHelper } from './mongo-helper'

export class PurchaseMongoRepository implements AddPurchaseRepository {
  async add (data: AddPurchaseRepository.Params): Promise<void> {
    const purchaseCollection = MongoHelper.getCollection('purchases')
    await purchaseCollection.insertOne(data)
  }
}
