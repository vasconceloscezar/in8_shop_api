import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories'

export default (router: Router): void => {
  router.post('/purchase', adaptRoute(makeAddPurchaseController()))
}
