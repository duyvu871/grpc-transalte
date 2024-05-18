import {NextAuthMiddleware} from "@/middlewares/next-auth.middleware";
import {ResponseTemplateMiddleware} from "@/middlewares/response-template.middleware";

export default function LoadMiddleware({ app }: {
    app: any;
}) {
    app.use(ResponseTemplateMiddleware.responseTemplate);
    app.use(NextAuthMiddleware.AuthJsCoreJWTAuthenticate);
    // app.use(NextAuthMiddleware.JWTAuthenticate);
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request URL: ${req.url}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request Type: ${req.method}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Time: ${Date.now()}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request IP: ${req.ip}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request headers: ${JSON.stringify(req.headers)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request body: ${JSON.stringify(req.body)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request query: ${JSON.stringify(req.query)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request params: ${JSON.stringify(req.params)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request cookies: ${JSON.stringify(req.cookies)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request session: ${JSON.stringify(req.session)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request signed cookies: ${JSON.stringify(req.signedCookies)}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request protocol: ${req.protocol}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request secure: ${req.secure}`);
    //     next();
    // });
    // app.use((req: any, res: any, next: any) => {
    //     console.log(`Request path: ${req.path}`);
    //     next();
    // })
}