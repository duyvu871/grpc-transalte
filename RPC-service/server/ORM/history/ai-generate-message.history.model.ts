import {Schema, model, Types, ObjectId} from 'mongoose';

export type SectionMessageGeneratedType = {
    _id: Types.ObjectId;
    user_id: Types.ObjectId;
    section_name: string;
    message_generated: ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export type MessageHistoryType = {
    _id: Types.ObjectId;
    message: string;
    role: 'USER' | 'ASSISTANT';
    createdAt: Date;
    updatedAt: Date;
    // coming soon update for the next version
    // modified history
}

const SectionMessageGeneratedSchema = new Schema({
        user_id: { type: Types.ObjectId, required: true },
        section_name: { type: String, required: true },
        message_generated: [{ type: Schema.Types.ObjectId, ref: 'chatbot_history' }],
        createdAt: { type: Date, required: true , default: Date.now},
        updatedAt: { type: Date, required: true , default: Date.now}
    },
    {
        _id: true,
        collection: 'chatbot_history'
    });
const MessageHistorySchema = new Schema({
    message: { type: String, required: true, default: ''},
    role: { type: String, required: true, enum: ['user', 'assistant'] },
    createdAt: { type: Date, required: true , default: Date.now},
    updatedAt: { type: Date, required: true , default: Date.now},
}, {
    _id: true,
    collection: 'chatbot_history'
});


export const SectionMessageGeneratedModel = model<SectionMessageGeneratedType>('SectionMessageGenerated', SectionMessageGeneratedSchema, 'section_message_generated');
export const MessageHistoryModel = model<MessageHistoryType>('MessageHistory', MessageHistorySchema, 'message_history');