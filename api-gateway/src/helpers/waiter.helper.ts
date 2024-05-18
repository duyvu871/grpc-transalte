import { Request, Response, NextFunction } from 'express';

class AsyncMiddleware {
    static asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>) {
        return (req: Request, res: Response, next: NextFunction) => {
            fn(req, res, next).catch(next);
        };
    }
}

export default AsyncMiddleware;
