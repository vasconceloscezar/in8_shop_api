import { LoadProductsController } from '../presentation/controllers'
import { type Controller } from '../presentation/protocols'
import { makeBrazilianProvider } from './make-brazilian-provider'
import { makeCacheService } from './make-cache'
import { makeEuropeanProvider } from './make-european-provider'

export const makeLoadProductsController = (): Controller => {
  const brazilianProvider = makeBrazilianProvider()
  const europeanProvider = makeEuropeanProvider()
  const providers = [brazilianProvider,europeanProvider]
  const cacheService = makeCacheService()
  const controller = new LoadProductsController(providers,cacheService)
  return controller
}
