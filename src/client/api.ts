
import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Client } from "./entities.js";


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
                const newClient = await fastify.orm
                    .createQueryBuilder()
                    .insert()
                    .into(Client)
                    .values([{
                        nameFirst: first_name,
                        nameLast:last_name,
                        phone:phone,
                        email:email,
                        address: address,
                        password:password
                    }]).execute()
                return reply.code(21).send({newClient})
            } catch (error) {
                
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

fastify.get<{Querystring: IQueryInterface, Headers:IHeaders, Reply: IReply}>('/clients', async (request,reply)=>{
    const { username,password } = request.body
    return reply.send({
        code:200,
        message: "success",
        body: {
            username,password
        }
    })
})



