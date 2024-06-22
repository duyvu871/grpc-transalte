import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { ChatbotServiceClient as _ChatbotServiceClient, ChatbotServiceDefinition as _ChatbotServiceDefinition } from './ChatbotService';
import type { TranslationServiceClient as _TranslationServiceClient, TranslationServiceDefinition as _TranslationServiceDefinition } from './TranslationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ChatbotService: SubtypeConstructor<typeof grpc.Client, _ChatbotServiceClient> & { service: _ChatbotServiceDefinition }
  ServiceError: MessageTypeDefinition
  TranslationService: SubtypeConstructor<typeof grpc.Client, _TranslationServiceClient> & { service: _TranslationServiceDefinition }
  chatbot: {
    SendMessageRequest: MessageTypeDefinition
    SendMessageResponse: MessageTypeDefinition
    UserContext: MessageTypeDefinition
  }
  chatbot_enums: {
    Role: EnumTypeDefinition
  }
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  translator: {
    DetectLanguageRequest: MessageTypeDefinition
    DetectLanguageResponse: MessageTypeDefinition
    GenericResponse: MessageTypeDefinition
    TranslateRequest: MessageTypeDefinition
    TranslateResponse: MessageTypeDefinition
    Translation: MessageTypeDefinition
  }
}

