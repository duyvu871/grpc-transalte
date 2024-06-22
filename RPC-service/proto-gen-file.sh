
#rm -rf pb/
yarn proto-loader-gen-types --longs=String --enums=String --defaults --keepCase --oneofs --grpcLib=@grpc/grpc-js --outDir=protobuf/Translation proto/Translation/Translator.proto

# shellcheck disable=SC1001
npx protoc --proto_path=F:\CODE\connected-brain\microservice-backend\RPC-service --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \ --ts_out="F:\CODE\connected-brain\microservice-backend\RPC-service\protobuf" \ "F:\CODE\connected-brain\microservice-backend\RPC-service\proto\**\*.proto"