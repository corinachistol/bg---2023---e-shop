import fastify from 'fastify'
import { getAllProducts, getAllClients, getClientById, addClient, updateClient, deleteClient, getHomePage } from '../controller/controller.js'


const getAllClientsOps = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' }
                    }
                }
            }
        }
    }
}

//nu functioneaza
const getClientOps = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                }
            }
        }
    }
}


//schema for post one item
const postClientOps = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name: { type: 'string' },
                address: { type: 'string' },
                phone: { type: 'number' },
                email: { type: 'string' },
                password: { type: 'string' }
            },
            required: ['name', 'address', 'email', 'password']
        }
    }
}


export async function clientRoutes(fastify, options) {

    fastify.get('/', getAllClientsOps, getAllClients)

    fastify.route({
        method: "GET",
        url: '/:id',
        preHandler: async function (request, reply) {
            // const fastify = this  
            const client = await fastify.pg.connect()
            // console.log(typeof request.query.session_id)

            const clientsQuery = await client.query(`SELECT * from clients WHERE id = ${request.params.id}`)
            const id_name = clientsQuery.rows.map(client => { return { id: client.id, name: client.name } });
            const clientSession = await client.query(`SELECT * FROM client_sessions WHERE session_id = '${request.query.session_id}'`)
            console.log(clientSession.rows[0])

            if (!request.query.session_id) {
                console.log("First")
                reply.send(id_name)

            }
            else if (clientSession.rows[0] !== undefined && request.params.id == clientSession.rows[0].client_id) { // req sessiona id nu este gol si are inregistrare in tabel.adica este logat si acceseaza datele sale

                console.log("Second")
                reply.send(clientsQuery.rows[0])
            }
            else {
                console.log("Third")
                reply.code(401).send("You are not authorized to access this data!")

                // do as in the first if (this mechanism will protect the client's data from getting in to the wrong hands),
            }

        },
        handler: getClientById
    })

    // fastify.get('/:id', getClientById )

    fastify.post('/add', postClientOps, addClient)

    fastify.route({
        method: "PATCH",
        url: '/:id',
        schema: postClientOps,
        preHandler: async function (request, reply) {
            const client = await fastify.pg.connect()
            const newClient = request.body

            const clientSession = await client.query(`SELECT * from client_sessions WHERE session_id ='${request.query.session_id}'`)
 
            if (!request.query.session_id) {
                console.log('Client unauthorized!')
                reply.code(401).send("Client not authorized!!!")
            }
            else if (clientSession.rows[0] !== undefined && request.params.id == clientSession.rows[0].client_id) { // daca clientul este autentificat si incearca sa updateze info sa
                console.log("You are trying to update your own data")
                // return reply.code(200).send("OK")
                const oldUserReq = await client.query(`SELECT * FROM clients WHERE id = ${request.params.id} `)
                const oldUser = oldUserReq.rows[0]
                // console.log(oldUser)
        
                const response = await client.query(`UPDATE clients SET(name ,address , phone , email ,password) = ('${newClient.name}', '${newClient.address}','${newClient.phone}', '${newClient.email}','${newClient.password}') WHERE id  = ${request.params.id}`) 
                console.log('....added')
                return response
              

            }
            else if (clientSession.rows[0] !== undefined && request.params.id !== clientSession.rows[0].client_id) {
                console.log("You are not authorized to update another user")
                reply.code(401).send("You are not authorized to update another user")
            
            }
        },
        handler: updateClient
    })

    // fastify.patch('/:id',postClientOps, updateClient)

    fastify.delete('/:id', deleteClient)

}

export async function productRoute(fastify, option) {

    fastify.get('/', getAllProducts)
}

export async function homePage(fastify, options) {
    fastify.get('/', getHomePage)
}


