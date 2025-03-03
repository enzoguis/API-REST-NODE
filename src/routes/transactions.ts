import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { createTransactionSchema } from '../models/create-transaction-schema'
import { randomUUID } from 'crypto'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return transactions
  })

  app.post('/', async (request, reply) => {
    const { title, amount, type } = createTransactionSchema.parse(request.body)

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return reply.status(201).send()
  })
}
