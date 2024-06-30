import { FastifyInstance } from "fastify";
import { ContactUserCase } from "../usercases/contact.usercase";
import { Contact, ContactCreate } from "../interface/contacts.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance){
    const contactUserCase = new ContactUserCase();

    fastify.addHook('preHandler', authMiddleware);
    fastify.post<{Body: ContactCreate}>('/', async (req, reply) => {
        const { name, email, phone } = req.body;
        const emailUser = req.headers['email'];
        try {
            const data = await contactUserCase.create({
                name, email, phone, userEmail: emailUser
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get('/', async (req, reply) => {
        const emailUser = req.headers['email'];

        try {
            const data = await contactUserCase.listAllContacts(emailUser);

            return data;
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.put<{Body: ContactCreate, Params: { id: string }}>(
        '/:id', 
        async (req, reply) => {
            const { id } = req.params;
            const { name, email, phone } = req.body;

            try {
                const data = await contactUserCase.updateContact({
                    id,
                    name,
                    email,
                    phone
                });

                return data;
            } catch (error) {
                reply.send(error);
            }
        }
    )

    fastify.delete<{Body: ContactCreate, Params: { id: string }}>(
        '/:id', 
        async (req, reply) => {
            const { id } = req.params;

            try {
                const data = await contactUserCase.deleteContact(id);

                return data;
            } catch (error) {
                reply.send(error);
            }
        }
    );
}