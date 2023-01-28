import { type AddPurchase } from '@/domain/usecases/add-purchase'

export interface AddPurchaseRepository {
  add: (data: AddPurchaseRepository.Params) => Promise<void>
}

export namespace AddPurchaseRepository {
  export type Params = AddPurchase.Params
}
