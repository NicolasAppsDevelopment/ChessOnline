import * as express from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../services/authentication.service";

export function expressAuthentication(
    request: express.Request,
    securityName: string,
) {
    if (securityName === "jwt") {
        const token =
            request.body.token ||
            request.query.token ||
            request.headers.authorization?.split(" ")[1];

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
                            resolve(decoded);
                        }
                    }
                );
            }
        });
    } else {
        throw new Error("Only JWT security is supported");
    }
}