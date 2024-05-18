import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import customConfig from "rpc-service/server/configs/default";
import {GoogleTranslatorController} from "translation-service/translation.controller";
import type {ProtoGrpcType} from "../protobuf/services";
import {TranslationServiceHandlers} from "../protobuf/TranslationService";

// function startServer() {
    const options: protoLoader.Options = {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    };// Options for protoLoader

    const PORT = customConfig.port;
    const PROTO_FILE = path.resolve(__dirname, '../proto/services.proto');
    const packageDefinition = protoLoader.loadSync(
        PROTO_FILE,
        options
    ); // Load the proto file with the specified options

    const proto = grpc.loadPackageDefinition(
        packageDefinition
    ) as unknown as ProtoGrpcType; // Load the package definition
    // Create a new server
    const server = new grpc.Server();

    // add the Translation service to the server
    server.addService(proto.TranslationService.service, {
        Translate: GoogleTranslatorController.translate
    } as TranslationServiceHandlers);

    // Start the server

    server.bindAsync(`localhost:${PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`Server is now listening on port: ${port}`);
            // server.start();
        }
    );
// }

// startServer();