import {Express, Request} from "express";
import {RouteRequestTestController} from "@/controllers/route_request_test.controller";
import { GoogleTranslatorController } from '@/controllers/google-translator.controller';

export function LoadRoutes({ app }: {
    app: Express;
}) {
    app.get('/test', RouteRequestTestController.test);
    app.post('/translate', GoogleTranslatorController.translate);
};