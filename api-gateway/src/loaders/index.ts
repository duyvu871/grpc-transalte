
import {Express} from "express";
import expressLoader from "@/loaders/express.loader";
import LoadMiddleware from "@/loaders/middleware.loader";

export default async function Loaders({expressApp}: {expressApp: Express}) {
    LoadMiddleware({app: expressApp});
    expressLoader({app: expressApp});
}