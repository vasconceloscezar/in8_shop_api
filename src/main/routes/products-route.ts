import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadProductsController } from '../factories'

export default (router: Router): void => {
  router.get('/products', adaptRoute(makeLoadProductsController()))
}
