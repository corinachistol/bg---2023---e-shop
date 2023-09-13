import Fastify from 'fastify'
import { itemRoutes } from './routes/routes.js'

const fastify = Fastify( {
    logger:true
} )

//console.log(fastity)
fastify.register(itemRoutes)

fastify.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
})

// const client = await fastify.pg.connect()

// itemRoutes(fastify)

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
        
    }
}

start()