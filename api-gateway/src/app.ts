'use strict';
import express from "express";
import Loaders from "@/loaders";
import helmet from "helmet";
import * as process from "node:process";
import dotenv from "dotenv";
import path from "path";
import AppConfig from "configs/app.config";

async function startServer() {
    const app = express();
    dotenv.config({
        path: path.join(AppConfig.rootPath, process.env.NODE_ENV === 'production' ? '/.env' : '/.env.local')
    }); // load env
    app.use(helmet()); // Set some HTTP headers for security
    await Loaders({expressApp: app});
    app.listen(process.env.APP_PORT, () => {

        if (process.env.NODE_ENV !== 'test') {
            console.log(`Server is running on port http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
        } else {
            console.log(`Test server is running on port http://${process.env.APP_HOST}:${process.env.APP_PORT}`);
        }
    });
}

startServer().then(() => console.log('Server started'));
