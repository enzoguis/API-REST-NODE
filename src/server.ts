import { app } from './app'
import { env } from './env'
app.listen({ port: env.PORT || 3000 }).then(() => {
  console.log('Server running on port: ', env.PORT)
})
