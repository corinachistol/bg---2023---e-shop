import {getAllProducts, getAllClients, getClientById, addClient, updateClient, deleteClient } from '../controller/controller.js'

//schema for post one item
const postClient = {
    schema: {
        body: {
            type: 'object',
            properties: {
                name:{ type: 'string'},
                address:{ type: 'string'},
                phone:{ type: 'number'},
                email:{ type: 'string'},
                password:{ type: 'string'}
            },
            required: ['name', 'address', 'email','password']
        }
    }
}


export async function itemRoutes(fastify,options, done) {
    fastify.get('/', getAllProducts)

    fastify.get('/clients', getAllClients)

    fastify.get('/clients/:id', getClientById )

    fastify.post('/clients/add',postClient, addClient )

    fastify.patch('/clients/:id',postClient, updateClient)

    fastify.delete('/clients/:id', deleteClient)

    done()
 
}