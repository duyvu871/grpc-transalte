// Original file: RPC-service/proto/Translation/Translator.proto

import type { Translation as _Translation, Translation__Output as _Translation__Output } from './Translation';

export interface TranslateResponse {
  'translation'?: (_Translation | null);
  'message'?: (string);
}

export interface TranslateResponse__Output {
  'translation': (_Translation__Output | null);
  'message': (string);
}
