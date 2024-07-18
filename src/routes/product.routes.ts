import { FastifyInstance } from "fastify";
import { ProductUserCase } from "../usercases/product.usercase.";
import { ProductCreate } from "../interface/products.interface";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateProductCreate } from "../middlewares/validateProductCreate";
export async function productRoutes(fastify: FastifyInstance) {
    const productUserCase = new ProductUserCase();

    fastify.addHook('preHandler', authMiddleware);

    fastify.post<{ Body: ProductCreate }>('/', {
        preHandler: validateProductCreate,
        handler: async (req, reply) => {
            const dataBody = req.body;

            try {
                const data = await productUserCase.create(dataBody);
                return reply.send(data);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    });

    fastify.get('/', async (req, reply) => {
        try {
            const products = await productUserCase.findAllProducts();

            return reply.send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;

        try {
            const products = await productUserCase.findById(id);

            return reply.send(products);
        } catch (error) {
            reply.status(500).send(error);
        }
    });

    fastify.delete<{ Body: ProductCreate, Params: { id: string } }>(
        '/:id',
        async (req, reply) => {
            const { id } = req.params;

            try {
                const data = await productUserCase.deleteProduct(id);

                return data;
            } catch (error) {
                reply.send(error);
            }
        }
    );

    fastify.put<{ Body: ProductCreate, Params: { id: string } }>(
        '/:id', {
        preHandler: validateProductCreate,
        handler: async (req, reply) => {
            const { id } = req.params;
            const dataBody = { ...req.body, id };

            try {
                const data = await productUserCase.updateProduct(dataBody);
                
                return reply.send(data);
            } catch (error) {
                reply.status(500).send(error);
            }
        }
    });

    // fastify.delete('/:id', async (req, reply) => {

    // });

    // fastify.get<{ Params: { id: string } }>('/:id', async (req, reply) => {
    //     const { id } = req.params;

    //     try {
    //         const product = await productUserCase.getById(id);
    //         if (product) {
    //             return reply.send(product);
    //         } else {
    //             return reply.status(404).send({ error: 'Product not found' });
    //         }
    //     } catch (error) {
    //         reply.status(500).send(error);
    //     }
    // });

    // fastify.put<{Body: ContactCreate, Params: { id: string }}>(
    //     '/:id', 
    //     async (req, reply) => {
    //         const { id } = req.params;
    //         const { name, email, phone } = req.body;

    //         try {
    //             const data = await contactUserCase.updateContact({
    //                 id,
    //                 name,
    //                 email,
    //                 phone
    //             });

    //             return data;
    //         } catch (error) {
    //             reply.send(error);
    //         }
    //     }
    // )

    // fastify.delete<{Body: ContactCreate, Params: { id: string }}>(
    //     '/:id', 
    //     async (req, reply) => {
    //         const { id } = req.params;

    //         try {
    //             const data = await contactUserCase.deleteContact(id);

    //             return data;
    //         } catch (error) {
    //             reply.send(error);
    //         }
    //     }
    // );
}
