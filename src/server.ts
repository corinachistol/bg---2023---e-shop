import Fastify from 'fastify';

const fastify = Fastify()

fastify.get('/', async (request, reply) => {
    reply.code(200).send({status:"Active"}) 
})

fastify.listen({port: 3000}, (err,address)=> {
    if(err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server is listening at ${address}`)
})