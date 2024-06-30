import { FastifyInstance } from "fastify";
import UserUseCase from "../usercases/user.usercase";
import { UserCreate, UserLogin } from "../interface/users.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function userRoutes(fastify: FastifyInstance){
    const userUseCase = new UserUseCase();

    fastify.post<{Body: UserCreate}>('/', async (req, reply) => {
        const { name, email, password } = req.body;
        try {
            const data = await userUseCase.create({
                name, email, password
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.post<{Body: UserLogin}>('/login', async (req, reply) => {
        const { email, password } = req.body;

        const user = await userUseCase.verifyCredentials(email, password);

        if (!user) {
            return reply.status(401).send({ message: 'Invalid email or password' });
        }

        const token = fastify.jwt.sign({ email });
        return reply.send({ token });
    });

    fastify.register(async (fastify) => {
        fastify.addHook("preHandler", authMiddleware);

        fastify.get('/', async (req, reply) => {
            try {
                const data = await userUseCase.findAll();
                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
        });
    });
}
