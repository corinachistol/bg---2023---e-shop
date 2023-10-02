import Fastify from 'fastify';

const fastify = Fastify()

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