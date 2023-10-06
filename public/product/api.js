var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//route post
import Fastify from 'fastify';
import { Product } from './entities.js';
import { postProductSchema } from './schema.js';
const fastify = Fastify({ logger: true });
export function postRoute(fastify, options) {
    return __awaiter(this, void 0, void 0, function* () {
        fastify.route({
            method: "POST",
            url: '/products',
            schema: postProductSchema,
            handler: (request, reply) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { id, name, amount, currency } = request.body;
                    const newProduct = yield fastify.orm
                        .createQueryBuilder()
                        .insert()
                        .into(Product)
                        .values({
                        // products_id: id,
                        products_name: name,
                        products_priceAmount: amount,
                        products_priceCurrency: currency
                    }).execute();
                    console.log('>>>>> item added');
                    reply.code(201).send(newProduct);
                }
                catch (error) {
                    reply.code(500).send({ error: 'Error adding a new product!' });
                }
            })
        });
        // fastify.post('/products',postProductSchema, async (request, reply) => {
        //     // let newData = {name: string, priceAmount: integer, priceCurrency: string}
        //     try {
        //         const {name, priceAmount, priceCurrency} = request.body
        //         // const newProduct = await fastify.orm.manager.create(Product, {
        //         //     name: name,
        //         //     priceAmount: priceAmount,
        //         //     priceCurrency: priceCurrency
        //         // })
    });
}
