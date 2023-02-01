import { makeDbAuthentication, makeLoginValidator } from '@/main/factories'
import { type Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidator())
  return controller
}
