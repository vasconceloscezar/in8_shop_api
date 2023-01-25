import { ok, serverError } from '../helpers/http-helper'
import { Controller, HttpResponse } from '../protocols'

export class GenericController implements Controller {

  async handle (request: any): Promise<HttpResponse> {
    try {
      return ok({
				message: 'Generic message'
			})
    } catch (err: any) {
      return serverError(err)
    }
  }
}
