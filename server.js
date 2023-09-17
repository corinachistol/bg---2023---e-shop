import Fastify from 'fastify'
import dbConnector from './dbConnection.js'
import { itemRoutes } from './routes/routes.js'
import { authRoutes } from './auth/auth.js'
import { testMiddleware } from './middleware/middleware.js'

const fastify = Fastify( {
    logger:true
} )


fastify.register(dbConnector)

fastify.register(itemRoutes)
fastify.register(authRoutes)
fastify.register(testMiddleware)




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