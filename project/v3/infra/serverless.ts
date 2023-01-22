import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "infrastructure-aws05",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    stage: "${opt:stage, 'dev'}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },
  // import the function via paths
  functions: {},
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
      SQSAWS05PE: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05PE-${self:provider.stage}",
        },
      },
      SQSAWS05CO: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05CO-${self:provider.stage}",
        },
      },
      SQSAWS05MX: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05MX-${self:provider.stage}",
        },
      },
      SNSTOPICAWS05PE: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICAWS05PE-${self:provider.stage}",
        },
      },
      SNSTOPICAWS05CO: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICAWS05CO-${self:provider.stage}",
        },
      },
      SNSTOPICAWS05MX: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: "SNSTOPICAWS05MX-${self:provider.stage}",
        },
      },
    },
    Outputs: {
      SQSAWS05PEARN: {
        Value: { "Fn::GetAtt": ["SQSAWS05PE", "Arn"] },
      },
      SQSAWS05PENAME: {
        Value: { "Fn::GetAtt": ["SQSAWS05PE", "QueueName"] },
      },
      SQSAWS05PEURL: {
        Value: { Ref: "SQSAWS05PE" },
      },
      SQSAWS05COARN: {
        Value: { "Fn::GetAtt": ["SQSAWS05CO", "Arn"] },
      },
      SQSAWS05CONAME: {
        Value: { "Fn::GetAtt": ["SQSAWS05CO", "QueueName"] },
      },
      SQSAWS05COURL: {
        Value: { Ref: "SQSAWS05CO" },
      },
      SQSAWS05MXARN: {
        Value: { "Fn::GetAtt": ["SQSAWS05MX", "Arn"] },
      },
      SQSAWS05MXNAME: {
        Value: { "Fn::GetAtt": ["SQSAWS05MX", "QueueName"] },
      },
      SQSAWS05MXURL: {
        Value: { Ref: "SQSAWS05MX" },
      },
      SNSTOPICARNPE: {
        Value: { Ref: "SNSTOPICAWS05PE" },
      },
      SNSTOPICARNCO: {
        Value: { Ref: "SNSTOPICAWS05CO" },
      },
      SNSTOPICARNMX: {
        Value: { Ref: "SNSTOPICAWS05MX" },
      },
    },
  },
};

module.exports = serverlessConfiguration;
