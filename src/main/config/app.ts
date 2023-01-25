import express, { Express } from 'express'
import setupRoutes from './routes'
import setupMiddlewares from './middleware'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
