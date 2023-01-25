import { GenericController } from "../presentation/controllers/generic-controller"
import { Controller } from "../presentation/protocols"


export const makeGenericRouteController = (): Controller => {
  const controller = new GenericController()
  return controller
}
