import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddPurchaseController , makeLoadPurchasesController } from '../factories'
import { auth } from '../middleware'

export default (router: Router): void => {
  router.post('/purchase', auth, adaptRoute(makeAddPurchaseController()))
  router.get('/purchases', auth, adaptRoute(makeLoadPurchasesController()))
}
