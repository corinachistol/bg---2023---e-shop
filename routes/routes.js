import fastify from 'fastify'
import {getAllProducts, getAllClients, getClientById, addClient, updateClient, deleteClient, getHomePage } from '../controller/controller.js'


const getAllClientsOps = {
    schema:{
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {type:'string'},
                        name: {type: 'string'}
                    }
                } 
            }
        }
    }
}

//nu functioneaza
const getClientOps = {
    schema:{
        response: {
            200: {
                type: 'object',
                properties: {
                    id: {type:'string'},
                    name: {type:'string'},
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


export async function clientRoutes(fastify,options) {

    fastify.get('/',getAllClientsOps, getAllClients)

    fastify.get('/:id', getClientById )

    fastify.post('/add',postClientOps, addClient )

    fastify.patch('/:id',postClientOps, updateClient)

    fastify.delete('/:id', deleteClient)
 
}

export async function productRoute (fastify,option) {

    fastify.get('/', getAllProducts)
}

export async function homePage(fastify,options){
    fastify.get('/', getHomePage)
}


