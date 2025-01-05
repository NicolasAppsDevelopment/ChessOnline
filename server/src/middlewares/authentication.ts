import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../services/authentication.service'
import { UserJwt } from '../models/UserJwt'

export function expressAuthentication(
    request: express.Request,
    securityName: string,
): Promise<UserJwt> {
    if (securityName === "jwt") {
        const token =
            request.headers?.authorization?.split(" ")[1] ??
            request.headers["authorization"]?.split(" ")[1];

        return new Promise((resolve, reject) => {
            if (token == null) {
                reject(new Error("No token provided"));
            } else {
                jwt.verify(
                    token,
                    JWT_SECRET,
                    function (err: any, decoded: any) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(decoded as UserJwt);
                        }
                    }
                );
            }
        });
    } else {
        throw new Error("Only JWT security is supported");
    }
}

export async function getUserIdFromJWT(
    request: express.Request
): Promise<number> {
    const jwt = await expressAuthentication(request, "jwt");
    return jwt.jwtPayload.id;
}