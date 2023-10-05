//route post
import Fastify, { FastifyInstance } from 'fastify'
import { Product } from './entities.js'

const fastify = Fastify({logger:true})

export async function postRoute (fastify:FastifyInstance, options: object) {
    fastify.post('/products', async (request, reply) => {
        console.log(request.body)
        const newProduct = new Product()
        

    })

}

