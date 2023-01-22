import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "infrastructure-aws05",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
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
          QueueName: "SQSAWS05PE",
        },
      },
      SQSAWS05CO: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05CO",
        },
      },
      SQSAWS05MX: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: "SQSAWS05MX",
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
    },
  },
};

module.exports = serverlessConfiguration;
