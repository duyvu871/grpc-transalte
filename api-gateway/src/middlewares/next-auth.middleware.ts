import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import AppConfig from "configs/app.config";
import {decode} from "next-auth/jwt"
// import {decode} from "@auth/core//jwt";
import AsyncMiddleware from "@/helpers/waiter.helper";
import {NextAuthJWT} from "types/JWT-custom.type";

export abstract class NextAuthMiddleware {
    public abstract subscribe(): void;
    public abstract unsubscribe(): void;

    public static JWTAuthenticate(request: Request, response: Response, next: NextFunction): any {
        const token: string|undefined = request.header('x-access-token');
        if (!token) return response.status(401).send({message: 'Unauthorized - no token provided'});
        jwt.verify(token, AppConfig.jwtSecret, (err:any, payload: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    return response
                        .status(401)
                        .json({ message: 'Unauthorized - token expired' });
                else
                    return response
                        .status(401)
                        .json({ message: 'Unauthorized - invalid token' });
            }
            // @ts-ignore
            request.user_id = payload.id;
            next();
        })
    }

    public static CheckAdminRole(request: Request, response: Response, next: NextFunction): any {
        const token: string|undefined = request.header('x-access-token');
        if (!token)
            return response
                .status(401)
                .send({message: 'Unauthorized - no token provided'});
        jwt.verify(token, AppConfig.jwtSecret, (err:any, payload: any) => {
            if (err) {
                if (err.name === 'TokenExpiredError')
                    return response
                        .status(401)
                        .json({ message: 'Unauthorized - token expired' });
                else
                    return response
                        .status(401)
                        .json({ message: 'Unauthorized - invalid token' });
            }
            if (payload.role !== 'ADMIN')
                return response
                    .status(401)
                    .json({ message: 'Unauthorized - invalid role' });
            // @ts-ignore
            request.user_id = payload.id;
            next();
        })
    }

    public static AuthJsCoreJWTAuthenticate = AsyncMiddleware.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const token: string | undefined = req.header('x-access-token');
        if (!token) return res.status(401).send({message: 'Unauthorized - no token provided'});
        const payload = await decode({
            token,
            secret: AppConfig.jwtSecret
        }) as NextAuthJWT;
        if (!payload) return res.status(401).send({message: 'Unauthorized - invalid token'});
        if (payload.exp && payload.exp < Date.now() / 1000)
            return res.status(401).send({message: 'Unauthorized - token expired'});
        // @ts-ignore
        req.token = payload;
        next();
    })
}