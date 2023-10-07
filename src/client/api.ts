
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Client, Name } from "./entities.js";


const fastify: FastifyInstance = Fastify({logger:true})

export async function getAllClients(fastify:FastifyInstance,options){
    fastify.get('/clients', async (request:FastifyRequest, reply:FastifyReply) => {
           const clients = await fastify.orm
               .getRepository(Client)
               .createQueryBuilder('clients')
               .getMany()
   
           reply.code(200).send({clients})
    })

}

export async function postClient(fastify:FastifyInstance,options){
    fastify.route({
        method: "POST",
        url: "/clients/add",
        handler:async (request:FastifyRequest, reply:FastifyReply) => {
            try {
                const { first_name, last_name, phone, email,address, password } = request.body
                const newClient = new Client()
                newClient.name = new Name();
                newClient.name.first = first_name,
                newClient.name.last = last_name,
                newClient.phone = phone,
                newClient.email = email,
                newClient.address =  address,
                newClient.password = password,
                console.log(newClient)
                await fastify.orm.manager.save(newClient)
                return reply.code(201).send({newClient})
            } catch (error) {
                reply.code(500).send({error: 'Error adding a new client!'})
            }              
        }
    })
    
}

interface IQueryInterface{
    username:string;
    password:string
}

interface IHeaders{
    'x-access-token': string;
}

interface IReply {
    code:number;
    message: string;
    body:any;
}
//din tutorial
// fastify.get<{Querystring: IQueryInterface, Headers:IHeaders, Reply: IReply}>('/clients', async (request,reply)=>{
//     const { username,password } = request.body
//     return reply.send({
//         code:200,
//         message: "success",
//         body: {
//             username,password
//         }
//     })
// })



