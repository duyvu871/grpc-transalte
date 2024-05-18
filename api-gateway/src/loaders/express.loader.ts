import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
// import dotenv from "dotenv";
import flash from "connect-flash";
import {LoadRoutes} from "@/routes";
import AppConfig from '@/configs/app.config';

export default ({app}: {app: Express}) => {

    app.get('/status', (res: Request, req: Response) => {
        req.status(200).end();
    }); // for load balancer
    app.head('/status', (res: Request, req: Response) => {
        req.status(200).end();
    }); // for load balancer
    app.enable('trust proxy'); // trust first proxy
    app.use(cors({})); // enable cors
    app.use(bodyParser.json({
        limit: '10mb'
    })); // parse json
    app.use(bodyParser.urlencoded({ extended: true })); // parse url encoded
    app.use(cookieParser()); // parse cookie
    app.use(flash()); // flash message
    app.use(express.static(AppConfig.rootPath + '/public')); // serve static file
    // console.log(AppConfig.rootPath + '/public');
    LoadRoutes({app}); // load routes
}