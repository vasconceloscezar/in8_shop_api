import { type AddUser } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '../helpers'
import { type Controller, type HttpResponse } from '../protocols'
import { type Validation } from '@/main/presentation/protocols'

export class SignUpController implements Controller {
  constructor (
    private readonly addUser: AddUser,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (request: SignUpControllerController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) return badRequest(error)

      const { name, email, password } = request
      const isValid = await this.addUser.add({
        name,
        email,
        password
      })
      if (!isValid) return forbidden(new EmailInUseError())

      const auth = await this.authentication.auth({
        email,
        password
      })

      return ok(auth)
    } catch (err) {
      return serverError(err)
    }
  }
}

export namespace SignUpControllerController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
