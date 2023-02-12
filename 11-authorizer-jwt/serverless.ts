import { authorizer, consumer, login, register } from "./src/functions";
import newAccessToken from "./src/functions/new-token";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "authorizer-jwt",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      JWT_SECRET: "abdd2ed8-5f94-49b8-bd02-fe07978b1d76",
    },
    iam: {
      role: "arn:aws:iam::282865065290:role/ROLE_FOR_LAMBDA_IN_COURSE",
    },
  },
  // import the function via paths
  functions: { consumer, register, login, authorizer, newAccessToken },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
  resources: {
    Resources: {
      UserTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "UserTable",
          BillingMode: "PAY_PER_REQUEST",
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
