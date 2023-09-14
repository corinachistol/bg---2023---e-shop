import fastifyPlugin from 'fastify-plugin'

async function dbConnector (fastify,options) {
    fastify.register(import('@fastify/postgres'), {
        connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
        
    })

}

export default fastifyPlugin(dbConnector)