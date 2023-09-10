import Fastify from 'fastify'
import fs from 'node:fs'

const fastify = Fastify( {
    logger:true
} )

//console.log(fastity)

fastify.register(import('@fastify/postgres'), {
    connectionString: 'postgres://postgres:postsql123@localhost:5432/js_shop'
})



async function itemRoutes() {
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
        const newClient = req.body
        console.log(JSON.parse(newClient))
        
       
        const  client = await fastify.pg.connect()

        try {
            // const { rows } = await client.query(`SELECT * from clients`)   
            const response = await client.query(`INSERT INTO clients(name,address,phone,email,password) VALUES('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.pasword}') RETURNING id`)   
            console.log(response)
            return response         
        
        } catch (err) {
            console.log(err)
        } finally {
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