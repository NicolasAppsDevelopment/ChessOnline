import express from 'express';
import {createServer} from 'node:http';
import {createHandler} from './socket_handler/handler';
import {Server} from 'socket.io';
import {RegisterRoutes} from "./routes";
import errorHandler from "./middlewares/errorHandler";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import {socketIoAuthentication} from "./middlewares/socketIoAuth";
import {User} from "./models/user.model";

const PORT = process.env.PORT ?? 8100;

const app = express();
app.use(cors());
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
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});
io.engine.use(socketIoAuthentication);

RegisterRoutes(app);
app.use(errorHandler);

io.on("connection", (socket) => {
    // @ts-ignore
    const user: User = socket.request.user;

    const {
        joinRoom,
        movePiece,
        getMoves,
    } = createHandler(socket, user);

    socket.on("JOIN_ROOM", joinRoom);
    socket.on("MOVE_PIECE", movePiece);
    socket.on("GET_MOVES", getMoves);
});

server.listen(PORT, () => {
    console.log('server running at http://10.8.0.2:' + PORT);
});