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


fastify.addHook('preHandler', async(request,reply) => {
    if(request.method === "PATCH" || request.method === "DELETE"){
        console.log("Update/Delete check")

        const client = await fastify.pg.connect()

        

        if(!request.query.session_id){
            console.log("First")
            reply.code(401).send("Client not authorized!!!")

        }else{
            const clientSession = await client.query(`SELECT * from client_sessions WHERE session_id ='${request.query.session_id}'`)

            if(clientSession.rows[0] !== undefined){
                if(request.params.id == clientSession.rows[0].client_id){
                    console.log("SECOND!You are trying to update/delete your own data")
                }else if(request.params.id !== clientSession.rows[0].client_id){
                    console.log("THIRD!You are not authorized to update/delete another user")
                    reply.code(401).send("You are not authorized to update/delete another user")
                }
            }
        }
        
        // if (!request.query.session_id) {
        //     console.log('Client unauthorized!')
        //     reply.code(401).send("Client not authorized!!!")
        // }
        // else if (clientSession.rows[0] !== undefined && request.params.id == clientSession.rows[0].client_id) { // daca clientul este autentificat si incearca sa updateze info sa
        //     console.log("You are trying to update/delete your own data")         

        // }
        // else if (clientSession.rows[0] !== undefined && request.params.id !== clientSession.rows[0].client_id) {
        //     console.log("You are not authorized to update/delete another user")
        //     reply.code(401).send("You are not authorized to update/delete another user")
        
        // }

    }
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