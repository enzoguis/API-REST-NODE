import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { createTransactionSchema } from '../models/create-transaction-schema'
import { randomUUID } from 'crypto'
import { getTransactionSchema } from '../models/get-transaction-schema'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()
    return { transactions }
  })

  app.get('/:id', async (request) => {
    const { id } = getTransactionSchema.parse(request.params)
    const transaction = await knex('transactions').where('id', id).first()

    return { transaction }
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
