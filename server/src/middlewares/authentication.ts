import * as express from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../services/authentication.service";
import {UserJwtPayload} from "../models/UserJwtPayload";
import {User} from "../models/user.model";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
): Promise<UserJwtPayload> {
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
                            resolve(decoded as UserJwtPayload);
                        }
                    }
                );
            }
        });
    } else {
        throw new Error("Only JWT security is supported");
    }
}

export async function getUsernameFromJWT(
    request: express.Request
): Promise<string> {
    const jwt = await expressAuthentication(request, "jwt");
    return jwt.username;
}