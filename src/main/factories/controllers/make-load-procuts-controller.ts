import { LoadProductsController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeBrazilianProvider } from '@/main/factories/usecases/make-brazilian-provider'
import { makeCacheService } from '@/main/factories/usecases/make-cache'
import { makeEuropeanProvider } from '@/main/factories/usecases/make-european-provider'

export const makeLoadProductsController = (): Controller => {
  const brazilianProvider = makeBrazilianProvider()
  const europeanProvider = makeEuropeanProvider()
  const providers = [brazilianProvider,europeanProvider]
  const cacheService = makeCacheService()
  const controller = new LoadProductsController(providers,cacheService)
  return controller
}
