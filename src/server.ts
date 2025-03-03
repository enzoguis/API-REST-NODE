import fastify from 'fastify'
import { knex } from './database'
import { randomUUID } from 'crypto'
const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})
app.listen({ port: 3333 }).then(() => {
  console.log('Server running on port 3333')
})
