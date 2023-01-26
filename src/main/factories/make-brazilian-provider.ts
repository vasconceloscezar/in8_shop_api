import axios from 'axios'
import { type ProductProvider } from '@/data/protocols'
import { BrazilianProvider } from '@/data/usecases/brazilian-provider'

export const makeBrazilianProvider = (): ProductProvider => {
  const brazilianProvider = new BrazilianProvider(axios.get)
  return brazilianProvider
}
