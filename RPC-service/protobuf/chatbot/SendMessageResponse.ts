// Original file: proto/Gemini.proto

import type { Role as _chatbot_enums_Role, Role__Output as _chatbot_enums_Role__Output } from '../chatbot_enums/Role';
import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

export interface SendMessageResponse {
  'id'?: (string);
  'message'?: (string);
  'role'?: (_chatbot_enums_Role);
  'created_at'?: (_google_protobuf_Timestamp | null);
  'updated_at'?: (_google_protobuf_Timestamp | null);
}

export interface SendMessageResponse__Output {
  'id': (string);
  'message': (string);
  'role': (_chatbot_enums_Role__Output);
  'created_at': (_google_protobuf_Timestamp__Output | null);
  'updated_at': (_google_protobuf_Timestamp__Output | null);
}
