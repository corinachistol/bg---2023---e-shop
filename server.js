import Fastify from 'fastify'
import dbConnector from './dbConnection.js'
import { clientRoutes, productRoute, homePage } from './routes/routes.js'
import { authRoutes } from './auth/auth.js'


const fastify = Fastify( {
    logger:true
} )


fastify.register(dbConnector)
// fastify.register(import('@fastify/url-data'))

fastify.register(clientRoutes, {prefix: '/clients'})
fastify.register(productRoute, { prefix:'/products'})
fastify.register(homePage)
fastify.register(authRoutes)


fastify.decorate('testMiddleware', async (request,reply) => {
    console.log(">>>TEST")
    fastify.log.info(">>>TEST!!!")
} )

fastify.addHook('preHandler', async (request,reply) => {
    fastify.testMiddleware(request)
})

fastify.decorate('checkRequestMethod', async(request,reply) => {
    if(request.method == "PATCH" || request.method == "DELETE"){
        console.log("Update/Delete check")

    }
})

fastify.addHook('onRequest', async(request,reply) => {
    fastify.checkRequestMethod(request)
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