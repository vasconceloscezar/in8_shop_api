import 'module-alias/register'
import * as dotenv from 'dotenv'
import env from './config/env' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { MongoHelper } from '@/infra/db/mongodb'
dotenv.config()

MongoHelper.connect(env.mongoURI)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
