import Fastify,{ FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import {Product} from './product/entities.js'
import {postProduct} from './product/api.js'
import  {Client} from './client/entities.js'
import { getAllClients,postClient } from './client/api.js';

const fastify:FastifyInstance = Fastify({logger:true})

fastify.register(import('fastify-typeorm-plugin'),{
    type: 'postgres',
    host:'localhost',
    port: 5432,
    database: 'e_shop_ff_orm',
    username: 'postgres',
    password: 'postsql123',
    logging: true,
    synchronize: true,
    entities: [Product,Client],
})

fastify.register(postProduct,)
fastify.register(getAllClients)
fastify.register(postClient)

fastify.get('/', async (request, reply) => {
    
  const products = await fastify.orm
        .getRepository(Product)
        .createQueryBuilder('products')
        .getMany()
  
     const newPayload = products.map(item => {
      return {
        ...item,
        _type: 'Products',
        price: {
          ...item.price,
          _type: 'Money'
        }
      }
    })
    
    reply.code(200).send(newPayload) 
})


const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
    fastify.log.info(`Server is listening on port:3000`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
    
  }
}

start()