import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeGenericRouteController } from '../factories/make-generic-route-controller'

export default (router: Router): void => {
  router.get('/generic_route', adaptRoute(makeGenericRouteController()))
}
