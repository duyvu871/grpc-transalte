import { Request, Response, Router } from 'express';

export default class ChatbotController {
    private readonly router: Router;
    constructor() {
        this.router = Router();
        this.initRoutes();
    }
    public initRoutes() {
        const router = this.router;
        router.post('/chatbot', this.chatbot);
    }
    public getRouter() {
        return this.router;
    }
    // for express middleware
    public chatbot(req: Request, res: Response) {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        return res.json({ text });
    }
}