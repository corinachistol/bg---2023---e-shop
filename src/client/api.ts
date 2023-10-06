
import Fastify from "fastify";
import { Client } from "./entities.js";

const fastify = Fastify({logger:true})

export async function getAllClients(fastify,options){
    fastify.get('/clients', async (request, reply) => {
           const clients = await fastify.orm
               .getRepository(Client)
               .createQueryBuilder('clients')
               .getMany()
   
           reply.code(200).send({clients})
    })

}



