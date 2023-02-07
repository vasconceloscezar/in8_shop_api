import { type Purchase } from '@/domain/models'
import { type LoadPurchasesByUser } from '@/domain/usecases'

export interface LoadPurchasesRepository {
  loadByUserId: (data: LoadPurchasesRepository.Params) => Promise<Purchase[]>
}

export namespace LoadPurchasesRepository {
  export type Params = LoadPurchasesByUser.Params
}
