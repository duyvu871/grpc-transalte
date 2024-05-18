import TranslateClient from 'client/translate-client'
import AsyncMiddleware from '@/helpers/waiter.helper';
import { NextFunction, Request, Response } from 'express';

export class GoogleTranslatorController {
    // for express middleware
    public static translate = AsyncMiddleware.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const {text, from, to} = req.body;

        if (!text || !from || !to) {
            return res.status(400).json({error: 'Missing required fields'});
        }

        TranslateClient.translate(
            {
                text,
                source_language: from,
                target_language: to
            }, (err, response) => {
            if (err) {
                return res.status(500).json({error: 'Internal Server Error'});
            }
            return res.json({
                translation: response.translation,
                from,
                to,
                text
            });
        })
    });
}