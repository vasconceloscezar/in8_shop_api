import { LoadProductsController } from '../presentation/controllers'
import { type Controller } from '../presentation/protocols'
import { makeBrazilianProvider } from './make-brazilian-provider'

export const makeLoadProductsController = (): Controller => {
  const brazilianProvider = makeBrazilianProvider()
  const providers = [brazilianProvider]
  const controller = new LoadProductsController(providers)
  return controller
}
