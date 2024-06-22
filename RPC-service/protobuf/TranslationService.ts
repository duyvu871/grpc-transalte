// Original file: proto/services.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { TranslateRequest as _translator_TranslateRequest, TranslateRequest__Output as _translator_TranslateRequest__Output } from './translator/TranslateRequest';
import type { TranslateResponse as _translator_TranslateResponse, TranslateResponse__Output as _translator_TranslateResponse__Output } from './translator/TranslateResponse';

export interface TranslationServiceClient extends grpc.Client {
  Translate(argument: _translator_TranslateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _translator_TranslateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _translator_TranslateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _translator_TranslateRequest, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _translator_TranslateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _translator_TranslateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _translator_TranslateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _translator_TranslateRequest, callback: grpc.requestCallback<_translator_TranslateResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TranslationServiceHandlers extends grpc.UntypedServiceImplementation {
  Translate: grpc.handleUnaryCall<_translator_TranslateRequest__Output, _translator_TranslateResponse>;
  
}

export interface TranslationServiceDefinition extends grpc.ServiceDefinition {
  Translate: MethodDefinition<_translator_TranslateRequest, _translator_TranslateResponse, _translator_TranslateRequest__Output, _translator_TranslateResponse__Output>
}
