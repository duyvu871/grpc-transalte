// Original file: RPC-service/proto/Translation/Translator.proto


export interface Translation {
  'translated_text'?: (string);
  'source_language'?: (string);
  'target_language'?: (string);
}

export interface Translation__Output {
  'translated_text': (string);
  'source_language': (string);
  'target_language': (string);
}
