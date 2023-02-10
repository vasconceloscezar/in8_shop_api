/* eslint-disable import/first */
import * as dotenv from 'dotenv'
import 'module-alias/register'
dotenv.config()
import { MongoHelper } from '@/infra/db/mongodb' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import env from './config/env'

MongoHelper.connect(env.mongoURI ?? '')
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(error => { console.log(error) })
