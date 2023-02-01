import { SignUpController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbAuthentication, makeDbAddUser } from '@/main/factories/usecases'
import { makeSignUpValidator } from './make-sign-up-validator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddUser(), makeSignUpValidator(), makeDbAuthentication())
  return controller
}
