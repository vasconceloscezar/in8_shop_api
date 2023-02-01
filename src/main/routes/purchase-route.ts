import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController } from '../factories'
import { auth } from '../middleware'

export default (router: Router): void => {
  router.post('/purchase', auth, adaptRoute(makeAddPurchaseController()))
}
