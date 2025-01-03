import { Server, Socket } from 'socket.io'
import {Position} from "../models/Position";
import {roomsService} from "../services/rooms.service";
import {User} from "../models/User";
import { ExtraDataMove } from '../models/ExtraDataMove'

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

            if (!chessboard.joinGame(user.id)) {
                socket.emit("JOIN_ROOM_RESPONSE", "Room full.");
            }

            io.to(roomUuid).emit("PLAYER_JOINED", user.username);
            socket.join(roomUuid);

            // notify back
            socket.emit("JOIN_ROOM_RESPONSE", null);
        },
        movePiece: async function (
            from: any,
            to: any,
            extra: ExtraDataMove
        ) {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const fromCellPosition = new Position(from.x,from.y);
            const toCellPosition = new Position(to.x, to.y);

            if (!chessboard.playMove(fromCellPosition, toCellPosition, user.id, extra)) {
                return;
            }

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        askDraw: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            chessboard.drawAskingOpponentPlayerId = chessboard.whitePlayerId == user.id ? chessboard.blackPlayerId : chessboard.whitePlayerId;

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        acceptDraw: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            if (!chessboard.draw(user.id)) {
                return;
            }

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        denyDraw: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            if (chessboard.drawAskingOpponentPlayerId == null || chessboard.drawAskingOpponentPlayerId != user.id) {
                return;
            }

            chessboard.drawAskingOpponentPlayerId = null;

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        resign: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            chessboard.resign(user.id);

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        reset: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            if (!chessboard.resetGame()) {
                io.to(roomUuid).emit("UPDATE_CHESSBOARD", null);
            }

            io.to(roomUuid).emit("UPDATE_CHESSBOARD", chessboard);
        },
        getChessboard: async function () {
            const roomUuid = await roomsService.getJoinedRoomUuid(user.id);
            if (!roomUuid) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            const chessboard = roomsService.boards.get(roomUuid);
            if (!chessboard) {
                socket.emit("UPDATE_CHESSBOARD", null);
                return;
            }

            socket.emit("UPDATE_CHESSBOARD", chessboard);
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

            chessboard.leaveGame(user.id);
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
