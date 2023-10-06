var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from "fastify";
import { Client } from "./entities.js";
const fastify = Fastify({ logger: true });
export function getAllClients(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.get('/clients', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const clients = yield fastify.orm
                .getRepository(Client)
                .createQueryBuilder('clients')
                .getMany();
            reply.code(200).send({ clients });
        }));
    });
}
export function postClient(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "POST",
            url: "/clients/add",
            handler: (request, reply) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { first_name, last_name, phone, email, address, password } = request.body;
                    const newClient = yield fastify.orm
                        .createQueryBuilder()
                        .insert()
                        .into(Client)
                        .values([{
                            nameFirst: first_name,
                            nameLast: last_name,
                            phone: phone,
                            email: email,
                            address: address,
                            password: password
                        }]).execute();
                    return reply.code(21).send({ newClient });
                }
                catch (error) {
                }
            })
        });
    });
}
fastify.get('/clients', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = request.body;
    return reply.send({
        code: 200,
        message: "success",
        body: {
            username, password
        }
    });
}));
