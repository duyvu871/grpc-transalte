import path from "path";

const AppConfig = {
    appPort: 1234,
    appHost: process.env.APP_HOST || 'localhost',
    express: {
        port: 3000,
        host: 'localhost',
        cors: true,
        bodyParser: true,
        cookieParser: true,
        helmet: true,
        morgan: true,
        compression: true,
        rateLimit: true,
        swagger: true,
    },
    storage: {
        path: {
            temp: path.join(__dirname, '../../storage/temp'),
            log: path.join(__dirname, '../../storage/log'),
            public: path.join(__dirname, '../../storage/public'),
            upload: path.join(__dirname, '../../storage/upload'),
        }
    },
    appTitle: 'My App',
    rootPath: path.resolve(__dirname, '../../'),
    jwtSecret: "lsdkmlskdmflksdkskmsdnkj",
    access_token_secret: "chaomungden",
    access_token_life: 3600,
    refresh_token_secret: "chaomungden",
    refresh_token_life: 2629743,
    wait_time: 180000, // 3 minutes
};

export default AppConfig;
