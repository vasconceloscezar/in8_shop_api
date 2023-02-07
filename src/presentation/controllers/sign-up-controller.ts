import { type Authentication, type AddUser } from '@/domain/usecases'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { EmailInUseError } from '@/presentation/errors'

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

      const { name, email, password, address, lastName, phoneNumber } = request
      const isValid = await this.addUser.add({
        name,
        email,
        password,
        address,
        lastName,
        phoneNumber
      })
      if (!isValid) return forbidden(new EmailInUseError())
      console.log(`New user created: ${request.email}`)
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
    address: string
    lastName: string
    phoneNumber: string
  }
}
