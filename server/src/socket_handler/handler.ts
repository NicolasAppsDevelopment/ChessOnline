import {Socket} from "socket.io";

export function createHandler(socket: Socket) {
    return {
        joinRoom: async function (
            roomUuid: string
        ) {
            socket.join(roomUuid);

            // notify back
            socket.emit("ROOM_JOINED", socket.id);
        },
    };
}
