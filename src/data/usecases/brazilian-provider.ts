import env from '@/main/config/env'
import { type ProductProvider, type RequestResponse } from '../protocols'

export class BrazilianProvider implements ProductProvider {
  constructor (private readonly get: (url: string) => Promise<RequestResponse>) {}
  async loadProducts (): Promise<any[]> {
    const data = await this.get(env.providersURL.brazilian).then(res => res.data)
    return data
  }

  async loadProductById (id: string): Promise<any> {
    const data = await this.get(`${env.providersURL.brazilian}/${id}`).then(res => res.data)
    return data
  }
}
