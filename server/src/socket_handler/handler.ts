import {Socket} from "socket.io";

export function createHandler(socket: Socket) {
    return {
        message: async function (
            message: string
        ) {
            console.log("Message received: ", message);

            // notify back
            socket.emit("message", socket.id);
        },
    };
}
