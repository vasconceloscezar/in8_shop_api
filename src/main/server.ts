import env from './config/env'

setTimeout(async () => {
  const { setupApp } = await import('./config/app')
  const app = await setupApp()
  try {
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  } catch (err) {
    console.error(err)
  }
}, 1000)
