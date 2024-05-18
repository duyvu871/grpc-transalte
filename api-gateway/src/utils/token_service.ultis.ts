import jwt from 'jsonwebtoken';

export class TokenService {
    public generateRandomToken(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}

export class JWTService extends TokenService {
    constructor() {
        super();
    }
    public async generateJWT({payload, secret, expiresIn}: {payload: any, secret: string, expiresIn: string}): Promise<string> {
        return jwt.sign(payload, secret, {expiresIn, algorithm: 'HS256'});
    }
    public async generateRefreshToken({payload, secret, expiresIn}: {payload: any, secret: string, expiresIn: string}): Promise<string> {
        return jwt.sign(payload, secret, {expiresIn, algorithm: 'HS256'});
    }
    public async verifyJWT({token, secret}: {token: string, secret: string}): Promise<any> {
        return jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return null;
            }
            return decoded;
        });
    }
    public async decodeJWT({token, secret}: {token: string; secret: string}): Promise<any> {
        return jwt.decode(token, {complete: true});
    }
}

