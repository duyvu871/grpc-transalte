import path from 'path';
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import customConfig from "client/configs/default";
import {ProtoGrpcType} from "protobuf/services";

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

const client = new proto.TranslationService(
    '127.0.0.1:' + PORT,
    grpc.credentials.createInsecure()
)

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Client is ready');
});

export default client;
