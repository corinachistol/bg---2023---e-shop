//route post
import Fastify, { FastifyInstance,FastifyReply,FastifyRequest,FastifySchema } from 'fastify'
import { Product } from './entities.js'
import { postProductSchema } from './schema.js'

const fastify: FastifyInstance = Fastify({logger:true})

export async function postRoute (fastify:FastifyInstance, options: object) {

    fastify.route({
        method: "POST",
        url: '/products',
        // schema:postProductSchema,
        handler: async (request:FastifyRequest, reply:FastifyReply ) => {
            try {
                // const {id, name, amount, currency} = request.body
                // console.log(name, amount, currency)

                const createQuery = await fastify.orm.createQueryBuilder()
                console.log('1.create Query', createQuery)

                const insert = createQuery.insert().into(Product)
                console.log('2.insert into', insert)

                const values = insert.values({
                    name: "Samsung Galaxy s20",
                    priceAmount: 800,
                    priceCurrency: "USD"
                })
                console.log('3.values', values)

                const execute = values.execute()
                console.log('4.execute',execute)

                //o alta varianta
                // const product = await fastify.orm.getRepository(Product).create(request.body)
                // console.log('1.product', product)
                // const results =  await fastify.orm.getRepository(Product).save(product)
                // console.log('2 results', results)
                
                    
                console.log('>>>>> item added')
                                     
                reply.code(201).send(execute)
    
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

             
            

   
}

