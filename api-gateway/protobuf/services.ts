import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TranslationServiceClient as _TranslationServiceClient, TranslationServiceDefinition as _TranslationServiceDefinition } from './TranslationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  DetectLanguageRequest: MessageTypeDefinition
  DetectLanguageResponse: MessageTypeDefinition
  TranslateRequest: MessageTypeDefinition
  TranslateResponse: MessageTypeDefinition
  TranslationService: SubtypeConstructor<typeof grpc.Client, _TranslationServiceClient> & { service: _TranslationServiceDefinition }
}

