import { Request } from 'express'
import { User } from './User'

export interface SocketUserRequest extends Request {
    user: User
    _query: { sid: string }
}