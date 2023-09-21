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
                    name: {type:'string'}
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

    fastify.route({
        method: "GET",
        url: '/:id',
        preHandler: async function (request, reply){ 
            // const fastify = this  
            const  client = await fastify.pg.connect() 
            // console.log(typeof request.query.session_id)
                   
            const clientsQuery = await client.query(`SELECT * from clients WHERE id = ${request.params.id}`) 
            const id_name = clientsQuery.rows.map(client => {return {id: client.id, name: client.name}});
            const clientSession = await client.query(`SELECT * FROM client_sessions WHERE session_id = '${request.query.session_id}'`)
            console.log(clientSession.rows[0]) 
                     
            if (!request.query.session_id  ){     
                console.log("First")
                reply.send(id_name )
                
            } 
            else if(clientSession.rows[0] !== undefined && request.params.id == clientSession.rows[0].client_id){ // req sessiona id nu este gol si are inregistrare in tabel.adica este logat si acceseaza datele sale
               
                console.log("Second")
                reply.send(clientsQuery.rows[0] )
            }
            else{
                console.log("Third")
                reply.code(401).send("You are not authorized to access this data!")

                // do as in the first if (this mechanism will protect the client's data from getting in to the wrong hands),
            }
            
        },
        handler:getClientById
    })

    // fastify.get('/:id', getClientById )

    fastify.post('/add',postClientOps, addClient )

    fastify.route({
        method:"PATCH",
        url: '/:id',
        schema: postClientOps,
        preHandler: async function (request,reply) {
            const  client = await fastify.pg.connect() 
                
            const clientQueryResult = await client.query(`SELECT * from client_sessions WHERE session_id ='${request.query.session_id}'`)  
            // console.log(clientQueryResult.rows[0])
            // const clientIdQuery = clientQueryResult.rows[0].client_id
            // const clientSessionQuery = clientQueryResult.rows[0].session_id
            // console.log(typeof clientSessionQuery)

            if(!request.query.session_id){
                console.log('Client unauthorized!')
                reply.code(401).send("Client not authorized!!!")
            } 
            else if( !!clientQueryResult.rows[0].session_id ){
                console.log("Client authorized and tries to accesss other data!")
                reply.code(401).send("You are not authorized to access this data!")

            } 
            else if( !!clientQueryResult.rows[0].session_id && request.params.id === clientQueryResult.rows[0].client_id) {
                console.log("You are trying to update your own data")

            }
            

            // if(request.query.session_id == clientSessionQuery && request.params.id == clientIdQuery ){
            //     console.log("There is a match")
            // }
            // else if (request.params.id == undefined) {
            //     console.log("There is not a match")
            //     // reply.code(401).send({message:"Unauthorized user for this action!"})
            // }

        },
        handler: updateClient
    })

    // fastify.patch('/:id',postClientOps, updateClient)

    fastify.delete('/:id', deleteClient)
 
}

export async function productRoute (fastify,option) {

    fastify.get('/', getAllProducts)
}

export async function homePage(fastify,options){
    fastify.get('/', getHomePage)
}


