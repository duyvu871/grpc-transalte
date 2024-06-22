// Original file: proto/Translator.proto


export interface TranslateRequest {
  'text'?: (string);
  'source_language'?: (string);
  'target_language'?: (string);
}

export interface TranslateRequest__Output {
  'text': (string);
  'source_language': (string);
  'target_language': (string);
}
