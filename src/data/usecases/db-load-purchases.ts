import { type LoadPurchasesByUser } from '@/domain/usecases'
import { type LoadPurchasesRepository } from '@/data/protocols/db'
import { type Purchase } from '@/domain/models'

export class DbLoadPurchases implements LoadPurchasesByUser {
  constructor (
    private readonly loadPurchasesRepository: LoadPurchasesRepository
  ) {}

  async loadByUserId (data: LoadPurchasesByUser.Params): Promise<Purchase[]> {
    const purchases = await this.loadPurchasesRepository.loadByUserId(data)
    return purchases
  }
}
