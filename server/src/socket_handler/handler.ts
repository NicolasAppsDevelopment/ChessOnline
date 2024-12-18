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
            socket.emit("ROOM_JOINED");
        },
        movePiece: async function (
            from: any,
            to: any
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.username);
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            if (board.movePiece(new Position(from.x, from.y), new Position(to.x, to.y))) {
                socket.to(roomUuid).emit("MOVE_RESPONSE", board.board);
            }
        },
        getMoves: async function (
            from: any
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.username);
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            socket.emit("MOVES_RESPONSE", board.getMoves(new Position(from.x, from.y)));
        }
    };
}
