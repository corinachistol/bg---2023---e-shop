import Fastify from 'fastify';
import {Product} from './product/entities.js'
import {postRoute} from './product/api.js'
import { Money } from './financial/entitites.js';
import  {Client} from './client/entities.js'
import { getAllClients } from './client/api.js';

const fastify = Fastify({logger:true})

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

fastify.register(postRoute)
fastify.register(getAllClients)


fastify.get('/', async (request, reply) => {
    console.log("Active")

    const products = await fastify.orm
        .getRepository(Product)
        .createQueryBuilder('products')
        .getMany()
    
      // return products;
    reply.code(200).send({products}) 
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