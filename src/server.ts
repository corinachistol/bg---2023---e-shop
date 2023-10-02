import Fastify from 'fastify';

const fastify = Fastify()

fastify.register(import('fastify-typeorm-plugin'), {
    type: 'postgres',
    host:'localhost',
    port: 3000,
    username: 'postgres',
    password: 'postsql123',
    database: './e_shop_ff_orm.psql'
})

fastify.get('/', async (request, reply) => {
    reply.code(200).send({status:"Active"}) 
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