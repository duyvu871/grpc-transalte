import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../../' + process.env.NODE_ENV === 'PRODUCTION' ? '.env' : '.env.local') });

const customConfig: {
    port: number;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    dbUri: string;
    accessTokenPrivateKey: string;
    accessTokenPublicKey: string;
    refreshTokenPrivateKey: string;
    refreshTokenPublicKey: string;
    redisCacheExpiresIn: number;
    emailFrom: string;
    smtp: {
        host: string;
        port: number;
        user: string;
        pass: string;
    };
} = {
    port: 40080,
    accessTokenExpiresIn: 15, // 15 minutes
    refreshTokenExpiresIn: 60, // 60 minutes
    redisCacheExpiresIn: 60, // 60 minutes

    dbUri: process.env.DATABASE_URL as string,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
    refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY as string,
    refreshTokenPublicKey: process.env.REFRESH_TOKEN_PUBLIC_KEY as string,
    emailFrom: process.env.EMAIL_FROM as string,
    smtp: {
        host: process.env.SMTP_HOST as string,
        port: Number(process.env.SMTP_PORT as string),
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
};

export default customConfig;
