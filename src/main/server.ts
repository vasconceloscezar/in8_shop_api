import 'module-alias/register'
import * as dotenv from 'dotenv'
import env from './config/env' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

setTimeout(async () => {
  const { setupApp } = await import('./config/app')
  const app = await setupApp()
  try {
    app.listen(env.port, () => {
      console.log(`Server running at http://localhost:${env.port}`)
    })
  } catch (err) {
    console.error(err)
  }
}, 1000)
