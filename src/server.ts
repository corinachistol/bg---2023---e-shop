import Fastify from 'fastify';
import {Product} from './product/entities.js'

const fastify = Fastify({logger:true})

fastify.register(import('fastify-typeorm-plugin'),{
    type: 'postgres',
    host:'localhost',
    port: 3000,
    database: './e_shop_ff_orm.psql',
    username: 'postgres',
    password: 'postsql123',
    logging: true,
    synchronize: true,
    entities: [Product],
})

fastify.get('/', async (request, reply) => {
    console.log("Active")
    // const products = await this.orm
    //     .getRepository(Product)
    //     .createQueryBuilder('products')
    //     .getMany()
    
    //     return products;
    reply.code(200).send({status:"Active"}) 
})

fastify.listen({ port: 8080 }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })


//   const start = async () => {
//     try {
//         await fastify.listen({ port: 3000 })
//         fastify.log.info(`Server is listening on port:3000`)
//     } catch (err) {
//         fastify.log.error(err)
//         process.exit(1)
        
//     }
// }

// start()