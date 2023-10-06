//route post
import Fastify, { FastifyInstance,FastifySchema } from 'fastify'
import { Product } from './entities.js'
import { postProductSchema } from './schema.js'

const fastify = Fastify({logger:true})

export async function postRoute (fastify:FastifyInstance, options: object) {

    fastify.route({
        method: "POST",
        url: '/products',
        schema:postProductSchema,
        handler: async (request, reply) => {
            // let newData = {name: string, priceAmount: integer, priceCurrency: string}
            try {
                const {name, priceAmount, priceCurrency} = request.body
                // const newProduct = await fastify.orm.manager.create(Product, {
                //     name: name,
                //     priceAmount: priceAmount,
                //     priceCurrency: priceCurrency
                // })
    
                 
                
    
                const newProduct = await fastify.orm
                    .createQueryBuilder()
                    .insert()
                    .into(Product)
                    .values({
                        name: name,
                        priceAmount: priceAmount,
                        priceCurrency: priceCurrency
    
                }).execute()
                console.log('>>>>> item added')
                                     
                reply.code(201).send(newProduct)
    
            } catch (error) {
                reply.code(500).send({error: 'Error adding a new product!'})
            }      
    
        }
    })

    // fastify.post('/products',postProductSchema, async (request, reply) => {
    //     // let newData = {name: string, priceAmount: integer, priceCurrency: string}
    //     try {
    //         const {name, priceAmount, priceCurrency} = request.body
    //         // const newProduct = await fastify.orm.manager.create(Product, {
    //         //     name: name,
    //         //     priceAmount: priceAmount,
    //         //     priceCurrency: priceCurrency
    //         // })

             
            

    //         const newProduct = await fastify.orm
    //             .createQueryBuilder()
    //             .insert()
    //             .into(Product)
    //             .values({
    //                 name: name,
    //                 priceAmount: priceAmount,
    //                 priceCurrency: priceCurrency

    //         }).execute()
    //         console.log('>>>>> item added')
                                 
    //         reply.code(201).send(newProduct)

    //     } catch (error) {
    //         reply.code(500).send({error: 'Error adding a new product!'})
    //     }      

    // })

}

