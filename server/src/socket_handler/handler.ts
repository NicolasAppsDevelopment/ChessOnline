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
            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("JOIN_ROOM_RESPONSE", "Room does not exist");
                return;
            }

            if (chessboard.playersId.indexOf(user.id) == -1) {
                chessboard.playersId.push(user.id);
            }

            io.to(roomUuid).emit("PLAYER_JOINED", user.username);
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

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                return;
            }

            if (chessboard.playersId[chessboard.turnIndex] != user.id){
                return;
            }

            const fromCellPosition = new Position(from.x,from.y);
            const toCellPosition = new Position(to.x, to.y);
            const fromPositionPiece = chessboard.getPiece(fromCellPosition)

            if (fromPositionPiece != null){
                if (chessboard.turnIndex == 0 && fromPositionPiece.getColor() != Color.White) {
                    return;
                }
                if (chessboard.turnIndex == 1 && fromPositionPiece.getColor() != Color.Black) {
                    return;
                }

                if (chessboard.movePiece(fromCellPosition, toCellPosition)) {
                    chessboard.switchTurn();
                    io.to(roomUuid).emit("MOVE_RESPONSE", chessboard);
                }
            }
        },
        getChessboard: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("GET_CHESSBOARD_RESPONSE", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("GET_CHESSBOARD_RESPONSE", null);
                return;
            }

            socket.emit("GET_CHESSBOARD_RESPONSE", chessboard);
        },
        getMoves: async function (
            from: any
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                return;
            }

            socket.emit("MOVES_RESPONSE", chessboard.getValidMoves(new Position(from.x, from.y)));
        },
        leaveRoom: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                return;
            }

            const playerIndex = chessboard.playersId.indexOf(user.id);
            if (playerIndex >= 0) {
                chessboard.playersId.splice(playerIndex, 1);
            }

            socket.leave(roomUuid);

            // room no longer exists
            if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
                try {
                    await roomsService.remove(roomUuid);
                } catch {}
            } else {
                io.to(roomUuid).emit("PLAYER_LEFT", user.username);
            }
        },
        disconnected: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                return;
            }

            io.to(roomUuid).emit("PLAYER_DISCONNECTED", user.username);

            // room no longer exists
            if (io.sockets.adapter.rooms.get(roomUuid)?.size === undefined) {
                try {
                    await roomsService.remove(roomUuid);
                } catch {}
            }
        }
    };
}
