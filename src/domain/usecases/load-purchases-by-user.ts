import { type Purchase } from '../models'

export interface LoadPurchasesByUser {
  loadByUserId: (data: LoadPurchasesByUser.Params) => Promise<Purchase[]>
}

export namespace LoadPurchasesByUser {
  export type Params = {
    userId: string
  }

}
