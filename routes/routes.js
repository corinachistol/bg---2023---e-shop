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
            
            const session_id = request.query.session_id
            const { rows } = await client.query(`SELECT * from clients`)  
            console.log(rows)

            console.log(request.params.id)
            console.log(session_id)
            
            if (session_id === undefined){
                         
                // o alta varianta de afisare a datelor clientilor pe linga schema
                const id_name = rows.map(row => {return {id: row.id, name: row.name}});
                reply.send(id_name )
                    
            // this.addSchema(getClientOps)
            //    reply.send(request.schema = getClientOps)
            // then the response will contain only the client's id and username
            } else if(session_id !== ''){
                const clientSession = await client.query(`SELECT * FROM client_sessions WHERE session_id = '${session_id}'`)
                const clientSessionId = clientSession.rows[0].client_id
                console.log(clientSessionId)

                if(clientSessionId === request.params.id){
                    return
                   //return  the complete client\s data (including password, email, etc),
                }else{
                    const id_name = rows.map(row => {return {id: row.id, name: row.name}});
                    reply.send(id_name )

                    // do as in the first if (this mechanism will protect the client's data from getting in to the wrong hands),
                }
            }
        },
        handler:getClientById
    })

    // fastify.get('/:id', getClientById )

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


