import prueba from '@functions/prueba';
import send from '@functions/send';

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "cursosdev-01-lambda",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      shouldStartNameWithService: true,
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  functions: {
    prueba,
    send,
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      platform: "node",
      concurrency: 10,
      define: { "require.resolve": undefined },
    },
  },
};

module.exports = serverlessConfiguration;
