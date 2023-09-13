import {getAllProducts, getAllClients, getClientById, addClient, updateClient, deleteClient } from '../controller/controller.js'

export async function itemRoutes(fastify,options) {
    fastify.get('/', getAllProducts)

    fastify.get('/clients', getAllClients)

    fastify.get('/clients/:id', getClientById )

    fastify.post('/clients/add', addClient )

    fastify.patch('/clients/:id', updateClient)

    fastify.delete('/clients/:id', deleteClient)
 
}