"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var default_1 = require("RPC-service/server/configs/default");
var options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
}; // Options for protoLoader
var PORT = default_1.default.port;
var PROTO_FILE = path_1.default.resolve(__dirname, '../proto/services.proto');
var packageDefinition = protoLoader.loadSync(PROTO_FILE, options); // Load the proto file with the specified options
var proto = grpc.loadPackageDefinition(packageDefinition); // Load the package definition
var client = new proto.TranslationService('localhost:' + PORT, grpc.credentials.createInsecure());
var deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Client is ready');
    client.Translate({
        text: 'Hello',
        source_language: 'en',
        target_language: 'vi'
    }, function (err, response) {
        if (err) {
            console.error(err);
            return;
        }
        console.log(response);
    });
    console.log('Request sent');
});
