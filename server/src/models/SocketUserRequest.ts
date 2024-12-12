import {Request} from "express";
import {User} from "./user.model";

export interface SocketUserRequest extends Request {
    user: User
    _query: { sid: string }
}