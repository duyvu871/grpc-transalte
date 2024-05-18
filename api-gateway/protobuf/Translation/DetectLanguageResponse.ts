// Original file: RPC-service/proto/Translation/Translator.proto


export interface DetectLanguageResponse {
  'detected_language'?: (string);
  'confidence_score'?: (number | string);
}

export interface DetectLanguageResponse__Output {
  'detected_language': (string);
  'confidence_score': (number);
}
