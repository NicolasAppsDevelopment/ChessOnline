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
import { roomsService } from './services/rooms.service';

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
        getBoard,
    } = createHandler(socket, user);

    socket.on("JOIN_ROOM", joinRoom);
    socket.on("MOVE_PIECE", movePiece);
    socket.on("GET_MOVES", getMoves);
    socket.on("GET_BOARD", getBoard);
    socket.on("LEAVE_ROOM", async () => {
        const roomUuid = await roomsService.getJoinedRoomUuid(user.username);
        if (!roomUuid) {
            return;
        }

        const board = roomsService.boards.get(roomUuid);
        if (!board) {
            return;
        }
        board.playersId.indexOf(user.id);

        socket.leave(roomUuid);

        // room no longer exists
        if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
            try {
                await roomsService.remove(roomUuid);
            } catch {}
        }
    });
    socket.on("disconnect", async () => {
        const roomUuid = await roomsService.getJoinedRoomUuid(user.username);
        if (!roomUuid) {
            return;
        }

        // room no longer exists
        if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
            try {
                await roomsService.remove(roomUuid);
            } catch {}
        }
    });
});

server.listen(PORT, () => {
    console.log('server on port ' + PORT);
});