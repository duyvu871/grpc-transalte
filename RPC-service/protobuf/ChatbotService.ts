// Original file: proto/services.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { SendMessageRequest as _chatbot_SendMessageRequest, SendMessageRequest__Output as _chatbot_SendMessageRequest__Output } from './chatbot/SendMessageRequest';
import type { SendMessageResponse as _chatbot_SendMessageResponse, SendMessageResponse__Output as _chatbot_SendMessageResponse__Output } from './chatbot/SendMessageResponse';

export interface ChatbotServiceClient extends grpc.Client {
  SendMessage(argument: _chatbot_SendMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatbot_SendMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatbot_SendMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  SendMessage(argument: _chatbot_SendMessageRequest, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatbot_SendMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatbot_SendMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatbot_SendMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  sendMessage(argument: _chatbot_SendMessageRequest, callback: grpc.requestCallback<_chatbot_SendMessageResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface ChatbotServiceHandlers extends grpc.UntypedServiceImplementation {
  SendMessage: grpc.handleUnaryCall<_chatbot_SendMessageRequest__Output, _chatbot_SendMessageResponse>;
  
}

export interface ChatbotServiceDefinition extends grpc.ServiceDefinition {
  SendMessage: MethodDefinition<_chatbot_SendMessageRequest, _chatbot_SendMessageResponse, _chatbot_SendMessageRequest__Output, _chatbot_SendMessageResponse__Output>
}
