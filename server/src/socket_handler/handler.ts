import {Socket} from "socket.io";
import {Position} from "../models/Position";
import {roomsService} from "../services/rooms.service";
import {User} from "../models/user.model";
export function createHandler(socket: Socket, user: User) {
    return {
        joinRoom: async function (
            roomUuid: string
        ) {
            socket.join(roomUuid);

            // notify back
            socket.emit("ROOM_JOINED", socket.id);
        },
        movePiece: async function (
            from: Position,
            to: Position
        ) {
            console.log(user);
            const roomUuid = user.username;

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            board.movePiece(from, to);

            socket.emit("MOVE_RESPONSE", board.board);
        },
        getMoves: async function (
            from: Position
        ) {

            const roomUuid = user.username;
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            socket.emit("MOVES_RESPONSE", board.getMoves(from));
        }
    };
}
