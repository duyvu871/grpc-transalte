

export class ChatbotService {
    constructor() {
        this.chatbot = new Chatbot();
    }
    async getResponse(message) {
        return this.chatbot.getResponse(message);
    }
}