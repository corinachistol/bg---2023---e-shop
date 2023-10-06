var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Fastify from 'fastify';
import { Product } from './product/entities.js';
import { postRoute } from './product/api.js';
import { Client } from './client/entities.js';
import { getAllClients, postClient } from './client/api.js';
const fastify = Fastify({ logger: true });
fastify.register(import('fastify-typeorm-plugin'), {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'e_shop_ff_orm',
    username: 'postgres',
    password: 'postsql123',
    logging: true,
    synchronize: true,
    entities: [Product, Client],
});
fastify.register(postRoute);
fastify.register(getAllClients);
fastify.register(postClient);
fastify.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Active");
    const products = yield fastify.orm
        .getRepository(Product)
        .createQueryBuilder('products')
        .getMany();
    // return products;
    reply.code(200).send({ products });
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fastify.listen({ port: 3000 });
        fastify.log.info(`Server is listening on port:3000`);
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
});
start();
