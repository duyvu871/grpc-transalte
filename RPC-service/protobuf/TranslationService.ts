// Original file: RPC-service/proto/services.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { TranslateRequest as _TranslateRequest, TranslateRequest__Output as _TranslateRequest__Output } from './Translation/TranslateRequest';
import type { TranslateResponse as _TranslateResponse, TranslateResponse__Output as _TranslateResponse__Output } from './Translation/TranslateResponse';

export interface TranslationServiceClient extends grpc.Client {
  Translate(argument: _TranslateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _TranslateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _TranslateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  Translate(argument: _TranslateRequest, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _TranslateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _TranslateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _TranslateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  translate(argument: _TranslateRequest, callback: grpc.requestCallback<_TranslateResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TranslationServiceHandlers extends grpc.UntypedServiceImplementation {
  Translate: grpc.handleUnaryCall<_TranslateRequest__Output, _TranslateResponse>;
  
}

export interface TranslationServiceDefinition extends grpc.ServiceDefinition {
  Translate: MethodDefinition<_TranslateRequest, _TranslateResponse, _TranslateRequest__Output, _TranslateResponse__Output>
}
