import TranslateClient from 'client/translate-client'
import AsyncMiddleware from '@/helpers/waiter.helper';
import { NextFunction, Request, Response } from 'express';
import {Router} from "express";

export class GoogleTranslatorController {
    private static instance: GoogleTranslatorController;
    private readonly router: Router;
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    public initRoutes() {
        const router = this.router;
        // router.post('/translate', this.translate);
    }
    public getRouter() {
        return this.router;
    }
    // for express middleware
    public static translate  = AsyncMiddleware.asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
    public static getInstance() {
        if (!GoogleTranslatorController.instance) {
            GoogleTranslatorController.instance = new GoogleTranslatorController();
        }
        return GoogleTranslatorController.instance;
    }
}