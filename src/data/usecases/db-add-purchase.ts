import { type AddPurchase } from '@/domain/usecases'
import { type AddPurchaseRepository } from '@/data/protocols/db'

export class DbAddPurchase implements AddPurchase {
  constructor (
    private readonly addPurchaseRepository: AddPurchaseRepository
  ) {}

  async add (purchaseData: AddPurchase.Params): Promise<void> {
    await this.addPurchaseRepository.add(purchaseData)
  }
}
