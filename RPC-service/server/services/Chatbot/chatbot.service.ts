import {GeminiChatService as Chatbot} from "chatbot-service/lib/model-ai/gemini";
import {Model, ObjectId, Schema} from "mongoose";
import {User, UserType} from "orm/user/user.model";
import {
    MessageHistoryModel as HistoryChat,
    MessageHistoryType,
    SectionMessageGeneratedModel as SectionMessageGenerated,
    SectionMessageGeneratedType,
} from "orm/history/ai-generate-message.history.model";
import clientPromise from "rpc-service/server/lib/connect/mongodb.connect";
import {Content} from "@google/generative-ai";
import {initAI} from "chatbot-service/utils/init-ai";

export class ChatbotService {
    private chatbot: Chatbot;
    private userModel: Model<UserType>;
    private sectionMessageGeneratedModel: Model<SectionMessageGeneratedType>;
    private messageHistoryModel: Model<MessageHistoryType>;
    private readonly USER_ID: ObjectId | string;

    constructor(userId: ObjectId | string) {
        this.USER_ID = userId;
        clientPromise.then(() => {
            this.initChatbot();
        });
    }
    public initChatbot() {
        this.chatbot = new Chatbot(process.env.GEMINI_API_KEY as string);
        this.userModel = User;
        this.messageHistoryModel = HistoryChat;
        this.sectionMessageGeneratedModel = SectionMessageGenerated;
    }
    // init the AI generate message service for new user
    public async initGenerateService(sectionName: string) {
        const initMessage = initAI().initPrompt;
        const userModel = this.userModel;
        const Chatbot = this.chatbot;
        const MessageHistoryModel = this.messageHistoryModel;
        if (!MessageHistoryModel) throw new Error('MessageHistoryModel not initialized')
        if (!Chatbot) throw new Error('Chatbot not initialized');
        if (!userModel) throw new Error('UserModel not initialized');

        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found')
        const sectionMessage = await this.createSectionMessage(sectionName);
        if (!sectionMessage) throw new Error('Failed to create section message');
        return sectionMessage;
    }
    // create a new section message for the user
    public async createSectionMessage(sectionName: string) {
        const userModel = this.userModel;
        const SectionMessageGeneratedModel = this.sectionMessageGeneratedModel;
        if (!SectionMessageGeneratedModel) throw new Error('SectionMessageGeneratedModel not initialized');
        if (!userModel) throw new Error('UserModel not initialized');
        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        const sectionMessage = await SectionMessageGeneratedModel.create({
            user_id: this.USER_ID,
            section_name: sectionName,
            message_generated: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        if (!sectionMessage) throw new Error('Failed to create section message');
        user.chatHistory.push(sectionMessage._id as unknown as Schema.Types.ObjectId);
        await user.save();
        return sectionMessage;
    }
    // send message to the chatbot and return the response
    public async sendMessage(message: string, sectionId: ObjectId): Promise<MessageHistoryType> {
        const userModel = this.userModel;
        const Chatbot = this.chatbot;
        const SectionMessageGeneratedModel = this.sectionMessageGeneratedModel;
        const MessageHistoryModel = this.messageHistoryModel;
        if (!MessageHistoryModel) throw new Error('MessageHistoryModel not initialized')
        if (!Chatbot) throw new Error('Chatbot not initialized');
        if (!userModel) throw new Error('UserModel not initialized');

        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        const validSection = user.chatHistory.find(historyId => historyId === sectionId);
        if (!validSection) throw new Error('Invalid section id');
        // get the user's message section
        const sectionMessage = await SectionMessageGeneratedModel.findById(sectionId);
        if (!sectionMessage) throw new Error('Section not found');

        // message sent by the user
        const chatRequest = {
            message,
            role: 'USER',
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ExcludeProperties<MessageHistoryType, '_id'>;
        const requestCreateMessage = await MessageHistoryModel.create(chatRequest);
        if (!requestCreateMessage) throw new Error('Failed to create message');
        // push the message id to the sectionMessage
        sectionMessage.message_generated.push(requestCreateMessage._id as unknown as Schema.Types.ObjectId);
        // array of id reference to the message generated by the assistant
        const chatHistoryIds = sectionMessage.message_generated;
        // get the chat history
        const chatHistory = await MessageHistoryModel.find(
            { _id: { $in: chatHistoryIds }
            }) as MessageHistoryType[];
        // fit the chatHistory to the Content type
        const fitChatHistory = chatHistory.map(chat => {
            return {
                parts: [chat.message] as unknown as Content['parts'],
                role: chat.role,
            };
        }) as Content[];
        // send the user's message to the assistant
        const response = await Chatbot.sendMessage(message, fitChatHistory, true);
        const chatResponse = {
            message: response,
            role: 'ASSISTANT',
            createdAt: new Date(),
            updatedAt: new Date(),
        } as ExcludeProperties<MessageHistoryType, '_id'>;
        const reqCreateBotMessage = await MessageHistoryModel.create(chatResponse);
        if (!reqCreateBotMessage) throw new Error('Failed to create bot message');
        sectionMessage.message_generated.push(reqCreateBotMessage._id as unknown as Schema.Types.ObjectId);

        await sectionMessage.save();
        await user.save();
        return reqCreateBotMessage;
    }
    // reset the chat history
    public async resetChat() {
        const userModel = this.userModel;
        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        user.chatHistory = [];
        await user.save();
    }
    // get the chat history
    public async getChatHistory() {
        const userModel = this.userModel;
        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        return this.sectionMessageGeneratedModel.find({
            _id: {$in: user.chatHistory}
        });
    }
    // get the chat history by section id
    public async getChatHistoryById(sectionId: ObjectId) {
        const userModel = this.userModel;
        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        return this.sectionMessageGeneratedModel.findById(sectionId);
    }
    // get the chat history detail
    public async getChatHistoryDetail(sectionId: ObjectId, page?: number, limit?: number) {
        const chatHistory = await this.getChatHistoryById(sectionId) as SectionMessageGeneratedType;
        if (!chatHistory) throw new Error('Chat history not found');
        const messageIds = chatHistory.message_generated;
        const MessageHistoryModel = this.messageHistoryModel;
        if (!MessageHistoryModel) throw new Error('MessageHistoryModel not initialized');
        if (!page || !limit) {
            return MessageHistoryModel.find({
                _id: {$in: messageIds}
            });
        }
        return MessageHistoryModel.find({
            _id: {$in: messageIds}
        }).skip((page - 1) * limit).limit(limit);
    }
    // delete the chat history
    public async deleteChatHistory(sectionId: ObjectId) {
        const userModel = this.userModel;
        const user = await userModel.findById(this.USER_ID);
        if (!user) throw new Error('User not found');
        const index = user.chatHistory.findIndex(historyId => historyId === sectionId);
        if (index === -1) throw new Error('Invalid section id');
        user.chatHistory.splice(index, 1);
        await user.save();
        return this.sectionMessageGeneratedModel.findByIdAndDelete(sectionId);
    }
}