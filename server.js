import Fastify from 'fastify'

const fastity = Fastify( {
    logger:true
} )

//console.log(fastity)

fastity.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
})


fastity.get('/', async (req, reply) => {
    const client = await fastity.pg.connect()
    // console.log(client)
    let result = []

    try {
        const { rows } = await client.query(`SELECT * from products`)
        //console.log(rows)
        
        return rows
        
    } catch (err) {
        console.log(err)
    } finally {
        //Release the client immediately after query resolve or throw error
        client.release()
    }
            
})

const start = async () => {
    try {
        await fastity.listen({ port: 3000 })
    } catch (err) {
        fastity.log.error(err)
        process.exit(1)
        
    }
}

start()
