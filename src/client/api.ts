
import Fastify, { FastifyInstance } from "fastify";
import { Client } from "./entities.js";


const fastify: FastifyInstance = Fastify({logger:true})

export async function getAllClients(fastify,options){
    fastify.get('/clients', async (request, reply) => {
           const clients = await fastify.orm
               .getRepository(Client)
               .createQueryBuilder('clients')
               .getMany()
   
           reply.code(200).send({clients})
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

fastify.get<{Querystring: IQueryInterface, Headers:IHeaders, Reply: IReply}>('/clients', async (reques,reply)=>{
    const { username,password } = reques.body
    return reply.send({
        code:200,
        message: "success",
        body: {
            username,password
        }
    })
})



