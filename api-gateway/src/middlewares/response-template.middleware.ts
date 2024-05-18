import {responseTemplate} from "@/utils/response_wrapper.ultis";
import {NextFunction, Request, Response} from "express";

export class ResponseTemplateMiddleware {
    public static responseTemplate = (req: Request, res: Response, next: NextFunction) => {
        responseTemplate(res);
        next();
    }
}