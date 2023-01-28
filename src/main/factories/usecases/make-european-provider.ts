import axios from 'axios'
import { type ProductProvider } from '@/data/protocols'
import { EuropeanProvider } from '@/data/usecases/european-provider'

export const makeEuropeanProvider = (): ProductProvider => {
  const provider = new EuropeanProvider(axios.get)
  return provider
}
