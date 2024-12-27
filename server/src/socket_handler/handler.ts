import { Server, Socket } from 'socket.io'
import {Position} from "../models/Position";
import {roomsService} from "../services/rooms.service";
import {User} from "../models/user.model";
import {Color} from "../models/Piece";

export function createHandler(socket: Socket, user: User, io: Server) {
    return {
        joinRoom: async function (
            roomUuid: string
        ) {
            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                socket.emit("JOIN_ROOM_RESPONSE", "Room does not exist");
                return;
            }
            //TODO check if a user is already in the room
            board.playersId.push(user.id);


            socket.join(roomUuid);

            // notify back
            socket.emit("JOIN_ROOM_RESPONSE", null);
        },
        movePiece: async function (
            from: any,
            to: any
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            if (board.playersId[board.turnIndex] != user.id){
                return;
            }

            const fromCellPosition = new Position(from.x,from.y);
            const toCellPosition = new Position(to.x, to.y);
            const fromPositionPiece = board.getPiece(fromCellPosition)

            if (fromPositionPiece != null){
                if (board.turnIndex == 0 && fromPositionPiece.getColor() != Color.White) {
                    return;
                }
                if (board.turnIndex == 1 && fromPositionPiece.getColor() != Color.Black) {
                    return;
                }

                if (board.movePiece(fromCellPosition, toCellPosition)) {
                    board.switchTurn();
                    console.log(roomUuid);
                    console.log(io.sockets.adapter.rooms.get(roomUuid)?.size);
                    io.to(roomUuid).emit("MOVE_RESPONSE", board);
                }
            }
        },
        getChessboard: async function () {
            console.log(user)
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("GET_CHESSBOARD_RESPONSE", null);
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                console.log(roomsService.boards, roomUuid);
                socket.emit("GET_CHESSBOARD_RESPONSE", null);
                return;
            }

            socket.emit("GET_CHESSBOARD_RESPONSE", board);
        },
        getMoves: async function (
            from: any
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }

            socket.emit("MOVES_RESPONSE", board.getMoves(new Position(from.x, from.y)));
        },
        leaveRoom: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            const board = roomsService.boards.get(roomUuid);
            if (!board) {
                return;
            }
            //TODO: remove user from board
            //board.playersId.indexOf(user.id);

            socket.leave(roomUuid);

            // room no longer exists
            if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
                try {
                    await roomsService.remove(roomUuid);
                } catch {}
            }
        },
        disconnected: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            // room no longer exists
            if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
                try {
                    await roomsService.remove(roomUuid);
                } catch {}
            }
        }
    };
}
