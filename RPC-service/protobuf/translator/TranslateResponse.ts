// Original file: proto/Translator.proto

import type { Translation as _translator_Translation, Translation__Output as _translator_Translation__Output } from '../translator/Translation';

export interface TranslateResponse {
  'translation'?: (_translator_Translation | null);
  'message'?: (string);
}

export interface TranslateResponse__Output {
  'translation': (_translator_Translation__Output | null);
  'message': (string);
}
