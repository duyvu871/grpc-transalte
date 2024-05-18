import TranslateService from 'translation-service/translation.service';
import grpc from "@grpc/grpc-js";
import {TranslateRequest} from "rpc-service/protobuf/Translation/TranslateRequest";
import {TranslateResponse} from "rpc-service/protobuf/Translation/TranslateResponse";
import {GenericResponse} from "../../../protobuf/Translation/GenericResponse";
import {ISOLangType} from "./utils/isoLanguage";
import {LanguageNameType} from "./utils/languageNames";
import {Status} from "@grpc/grpc-js/build/src/constants";

export class GoogleTranslatorController {
    public static translate = async (
        req: grpc.ServerUnaryCall<TranslateRequest, TranslateResponse>,
        res: grpc.sendUnaryData<TranslateResponse>
    ) => {
        const {text, source_language: from,target_language: to } = req.request;
        console.log(req.request);
        if (!text || !from || !to) {
            res({code: Status.DATA_LOSS},{message: "Missing required fields"});
        }
        const translator = new TranslateService();
        const translation = await translator.translate(
            text,
            {from, to} as {
                from: ISOLangType | LanguageNameType | 'auto';
                to: ISOLangType | LanguageNameType;
            }
        );
        res(null, {
            translation: {
                translated_text: translation.translation,
                source_language: translation.from,
                target_language: translation.to,
            },
            message: "Translation successful",
        });
    }
}