import { UserJwtPayload } from './UserJwtPayload'

export interface UserJwt {
    jwtPayload : UserJwtPayload;
    iat: number;
    exp: number;
}
