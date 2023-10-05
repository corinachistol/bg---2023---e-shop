//route post
import Fastify, { FastifyInstance } from 'fastify'
import { Product } from './entities.js'

const fastify = Fastify({logger:true})

export async function postRoute (fastify:FastifyInstance, options: object) {
    fastify.post('/products', async (request, reply) => {
        try {
            const newData = request.body
            console.log(newData.name, newData.priceAmount,newData.priceCurrency)

            const newProduct = await fastify.orm
                .createQueryBuilder()
                .insert()
                .into(Product)
                .values({
                    name: newData.name,
                    price: `${newData.priceAmount}:${newData.priceCurrency}`,
                    // priceCurrency: newData.priceCurrency

            }).execute()
            console.log('>>>>> item added')
                                 
            reply.code(201).send(newProduct)

        } catch (error) {
            reply.code(500).send({error: 'Error adding a new product!'})
        }      

    })

}

