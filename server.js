import Fastify from 'fastify'

const fastify = Fastify( {
    logger:true
} )

//console.log(fastity)

fastify.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
})


export async function itemRoutes() {
    fastify.get('/', async (req, reply) => {
        const client = await fastify.pg.connect()
        // console.log(client)
        
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

    fastify.get('/clients', async (req,reply) => {
        const  client = await fastify.pg.connect()

        try {
            const { rows } = await client.query(`SELECT * from clients`)           
            return rows
            
        } catch (err) {
            console.log(err)
        } finally {
            //Release the client immediately after query resolve or throw error
            client.release()
        }
    })

    fastify.get('/clients/:id', async (req,reply) => {
        const  client = await fastify.pg.connect()
        

        try {
            const { rows } = await client.query(`SELECT * from clients WHERE id = ${req.params.id}`)   
            // const  { id }  = await req.params 
           
            // const item = rows.find(row => row.id == id)   
            return rows
         
        
        } catch (err) {
            console.log(err)
        } finally {
            //Release the client immediately after query resolve or throw error
            client.release()
        }
    })

    fastify.post('/clients/add', async (req,reply) => {
               
        const  client = await fastify.pg.connect()
        const newClient = req.body

        try {
            
            const response = await client.query(`INSERT INTO clients(name,address,phone,email,password) VALUES('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') `)   
            // console.log(response)
            return response       
        
        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }
    })

    fastify.patch('/clients/:id', async (req,reply) => {
        const  client = await fastify.pg.connect()
        const newClient = req.body

        try {
            const oldUserReq = await client.query(`SELECT * FROM clients WHERE id = ${req.params.id} `)
            const oldUser = oldUserReq.rows[0]
            console.log(oldUser)
            
            const response = await client.query(`UPDATE clients SET(name ,address , phone , email ,password) = ('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') WHERE id  = ${req.params.id}`) 
                console.log('....added')
            return response 
            
        } catch (err) {
            console.log(err)
        } finally{
            client.release()
        }
    })


    fastify.delete('/clients/:id', async (req,reply) => {
        const client = await fastify.pg.connect()

        try {
            const { rows } = await client.query(` DELETE from clients WHERE id = ${req.params.id}`)
            console.log(`client ${req.params.id} deleted!!!!`)   
            return rows
         
        
        } catch (err) {
            console.log(err)
        } finally {
            //Release the client immediately after query resolve or throw error
            client.release()
        }
    })
 
}


itemRoutes()

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
        
    }
}

start()