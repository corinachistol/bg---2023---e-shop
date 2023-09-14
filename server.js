import Fastify from 'fastify'
import { itemRoutes } from './routes/routes.js'


const fastify = Fastify( {
    logger:true
} )

//console.log(fastity)

fastify.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
    
})

fastify.register(itemRoutes)


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