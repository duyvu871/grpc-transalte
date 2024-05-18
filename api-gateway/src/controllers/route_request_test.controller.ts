import {NextFunction, Request, Response} from "express";
import AsyncMiddleware from "@/helpers/waiter.helper";
import {responseTemplate} from "@/utils/response_wrapper.ultis";


export class RouteRequestTestController {
    public static test = AsyncMiddleware.asyncHandler(async (req: Request & {token: string}, res: Response, next: NextFunction) => {
        try {
            const token: string | undefined = req.token;
            // console.log(token);
            return res.status(200).json({
                message: 'Route request test successful'
            });
        } catch (error) {
            return res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        }
    })
}