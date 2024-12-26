import { expressAuthentication } from "./authentication";
import { userService } from "../services/user.service";
import { Response, NextFunction } from "express";
import {SocketUserRequest} from "../models/SocketUserRequest";
import {UserJwt} from "../models/UserJwt";

export async function socketIoAuthentication(req: SocketUserRequest, res: Response, next: NextFunction) {
    const isHandshake = req._query.sid === undefined;
    if (!isHandshake) {
        return next();
    }

    try {
        const data: UserJwt = await expressAuthentication(req, "jwt");
        const user = await userService.getUserById(data.jwtPayload.id);
        if (!user) {
            return next(new Error("User not found"));
        }
        req.user = user;
        return next();
    } catch (error) {
        console.error("Authentication error:", error);
        return next(new Error("Invalid token"));
    }
}