import {Schema, model, Types, ObjectId} from 'mongoose';

export interface UserType {
    _id: Types.ObjectId;
    username: string;
    email: string;
    passwordHash: string; // hash password
    firstName: string;
    lastName: string;
    avatarUrl: string; // avatar
    twoFactorEnabled: boolean;
    twoFactorSecret: string; // 2FA secret
    twoFactorRecoveryCodes: string[]; // 2FA recovery codes
    chatHistory: ObjectId[];
    featureHistory: ObjectId[];
}

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatarUrl: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },
    twoFactorRecoveryCodes: [{ type: String }],
    chatHistory: [{type: Schema.Types.ObjectId, ref: 'chatbot_history'}],
    featureHistory: [{type: Schema.Types.ObjectId, ref: 'FeatureHistory'}],
});

export const User = model<UserType>('User', userSchema, 'users');