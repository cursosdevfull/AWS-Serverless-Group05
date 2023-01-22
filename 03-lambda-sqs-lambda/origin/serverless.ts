import send from '@functions/send';

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "origin03",
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
      SQS_QUEUE_URL: "${cf:origin03-dev.SQSQueueUrl}",
      /*SQS_QUEUE_URL:
        "https://sqs.us-east-1.amazonaws.com/282865065290/SQSAWS05",*/
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["sqs:SendMessage"],
            Resource: "arn:aws:sqs:us-east-1:282865065290:SQSAWS05",
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: { send },
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
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05",
        },
      },
    },
    Outputs: {
      SQSQueueArn: {
        Value: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
      },
      SQSQueueName: {
        Value: { "Fn::GetAtt": ["SQSQueue", "QueueName"] },
      },
      SQSQueueUrl2: {
        Value: { "Fn::GetAtt": ["SQSQueue", "QueueUrl"] },
      },
      SQSQueueUrl: {
        Value: { Ref: "SQSQueue" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
