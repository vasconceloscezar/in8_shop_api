import { type AddPurchaseRepository } from '@/data/protocols/db/purchases'
import { type Purchase } from '@/domain/models'
import { type LoadPurchasesByUser } from '@/domain/usecases'
import { MongoHelper } from './mongo-helper'

export class PurchaseMongoRepository implements AddPurchaseRepository, LoadPurchasesByUser {
  async add (data: AddPurchaseRepository.Params): Promise<void> {
    const purchaseCollection = MongoHelper.getCollection('purchases')
    await purchaseCollection.insertOne(data)
  }

  async loadByUserId (data: LoadPurchasesByUser.Params): Promise<Purchase[]> {
    const purchaseCollection = MongoHelper.getCollection('purchases')
    const purchases = await purchaseCollection.find({ 'user.userId': data.userId }).toArray()
    if (purchases.length > 0) {
      return MongoHelper.mapCollection(purchases)
    }
    return []
  }
}
