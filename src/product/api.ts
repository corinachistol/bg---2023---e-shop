//route post
import Fastify, { FastifyInstance } from 'fastify'
import { Product } from './entities.js'

const fastify = Fastify({logger:true})

export async function postRoute (fastify:FastifyInstance, options: object) {
    fastify.post('/products', async (request, reply) => {
        try {
            const newData = request.body
            console.log(newData)

            const newItem = await fastify.orm.getRepository(Product).create(newData)
            await 

            // const query = await fastify.orm.createQueryBuilder().insert().into(Product).values({
            //     name: name,
            //     priceAmount: priceAmount,
            //     priceCurrency: priceCurrency

            // }).execute()
            console.log('>>>>> item added')
                                 
            reply.code(201).send(newItem)

        } catch (error) {
            reply.code(500).send({error: 'Error adding a new product!'})
        }
        
        // await userRepository.save(newProduct)
        

    })

}

