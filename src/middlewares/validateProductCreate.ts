import { FastifyRequest, FastifyReply } from 'fastify';
import { ProductCreate } from '../interface/products.interface';

export const validateProductCreate = async (request: FastifyRequest, reply: FastifyReply) => {
    const data: ProductCreate = request.body as ProductCreate;

    if (!data.name) {
        return reply.status(400).send({ error: 'Name is required' });
    }

    if (!data.description) {
        return reply.status(400).send({ error: 'Description is required' });
    }

    if (data.price === undefined) {
        return reply.status(400).send({ error: 'Price is required' });
    }
};
