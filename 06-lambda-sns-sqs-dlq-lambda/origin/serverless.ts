import send from '@functions/send';

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "origin06",
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
      SNS_TOPIC_ARN: "arn:aws:sns:us-east-1:282865065290:SNSTopic06",
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: ["sns:Publish"],
            Resource: "arn:aws:sns:us-east-1:282865065290:SNSTopic06",
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
      SQSQueue06: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS06",
          VisibilityTimeout: 20,
          MessageRetentionPeriod: 86400,
          RedrivePolicy: {
            deadLetterTargetArn: { "Fn::GetAtt": ["SQSQueueDLQ", "Arn"] },
            maxReceiveCount: 1,
          },
        },
      },
      SQSQueueDLQ: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWSDLQ",
          VisibilityTimeout: 20,
          MessageRetentionPeriod: 86400,
        },
      },
      SNSTopic06: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTopic06",
          Subscription: [
            {
              Protocol: "sqs",
              Endpoint: { "Fn::GetAtt": ["SQSQueue06", "Arn"] },
            },
          ],
        },
      },
      SQSQueuePolicy06: {
        Type: "AWS::SQS::QueuePolicy",
        Properties: {
          PolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Action: "sqs:SendMessage",
                Resource: { "Fn::GetAtt": ["SQSQueue06", "Arn"] },
                Principal: "*",
                Condition: {
                  ArnEquals: {
                    "aws:SourceArn": { Ref: "SNSTopic06" },
                  },
                },
              },
            ],
          },
          Queues: [{ Ref: "SQSQueue06" }],
        },
      },
    },
    Outputs: {
      SNSTopic06Arn: {
        Value: { Ref: "SNSTopic06" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
