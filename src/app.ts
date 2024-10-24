import express from 'express';
import { createServer } from 'node:http';
import { createHandler } from './socket_handler/handler';
import { Server } from 'socket.io';
import { RegisterRoutes } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 8100;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: "/swagger.json",
        },
    }),
);

const server = createServer(app);
const io = new Server(server);

RegisterRoutes(app);
app.use(errorHandler);

io.on("connection", (socket) => {
    const {
        message,
    } = createHandler(socket);

    socket.on("message", message);
});

server.listen(PORT, () => {
    console.log('server running at http://localhost:' + PORT);
});