import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/user.routes";
import { contactRoutes  } from "./routes/contact.routes";
import { productRoutes  } from "./routes/product.routes";
import jwtAuth from './auth';

const app: FastifyInstance = fastify({ logger: true });

app.register(jwtAuth);

app.register(userRoutes, {
    prefix: "/users",
});

app.register(contactRoutes, {
    prefix: "/contacts",
});

app.register(productRoutes, {
    prefix: "/products",
});

app.listen({ port: 3100 }, () => console.log("Server is running on port 3100"));