
export async function testMiddleware(fastify,options){
    fastify.addHook('onRequest', async(req,reply) => {
        console.log(">>>>TEST!!!")
        fastify.log.info("TEST!!!")
    })
}

