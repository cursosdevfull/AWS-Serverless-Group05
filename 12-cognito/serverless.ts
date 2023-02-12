import users from "@functions/users";

import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "cognito-curso05",
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
    },
  },
  // import the function via paths
  functions: { users },
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
      CognitoUserPool: {
        Type: "AWS::Cognito::UserPool",
        Properties: {
          UserPoolName: "cognito-curso-05",
          AutoVerifiedAttributes: ["email"],
          EmailVerificationSubject: "Verificación necesaria",
          EmailVerificationMessage:
            "Debes usar el siguiente código para verificar tu cuenta: {####}",
        },
      },
      CognitoUserPoolClient: {
        Type: "AWS::Cognito::UserPoolClient",
        Properties: {
          ClientName: "user-pool-client-cognito-curso-05",
          GenerateSecret: false,
          UserPoolId: { Ref: "CognitoUserPool" },
          ExplicitAuthFlows: [
            "ALLOW_USER_PASSWORD_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH",
          ],
        },
      },
      CognitoIdentityPool: {
        Type: "AWS::Cognito::IdentityPool",
        Properties: {
          IdentityPoolName: "identity-pool-cognito-curso-05",
          AllowUnauthenticatedIdentities: false,
          CognitoIdentityProviders: [
            {
              ProviderName: {
                "Fn::GetAtt": ["CognitoUserPool", "ProviderName"],
              },
              ClientId: { Ref: "CognitoUserPoolClient" },
            },
          ],
        },
      },
      CognitoAuthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "cognito-auth-role-cognito-curso-05",
          Path: "/",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com",
                },
                Action: ["sts:AssumeRoleWithWebIdentity"],
                Condition: {
                  StringEquals: {
                    "cognito-identity.amazonaws.com:aud": {
                      Ref: "CognitoIdentityPool",
                    },
                  },
                  "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "authenticated",
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: "cognito-auth-policy-aws04",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "mobileanalytics:PutEvents",
                      "cognito-sync:*",
                      "cognito-identity:*",
                    ],
                    Resource: "*",
                  },
                  {
                    Effect: "Allow",
                    Action: ["execute-api:Invoke"],
                    Resource: "*",
                  },
                ],
              },
            },
          ],
        },
      },
      CognitoUnauthRole: {
        Type: "AWS::IAM::Role",
        Properties: {
          RoleName: "cognito-unauth-role-cognito-curso-05",
          Path: "/",
          AssumeRolePolicyDocument: {
            Version: "2012-10-17",
            Statement: [
              {
                Effect: "Allow",
                Principal: {
                  Federated: "cognito-identity.amazonaws.com",
                },
                Action: ["sts:AssumeRoleWithWebIdentity"],
                Condition: {
                  StringEquals: {
                    "cognito-identity.amazonaws.com:aud": {
                      Ref: "CognitoIdentityPool",
                    },
                  },
                  "ForAnyValue:StringLike": {
                    "cognito-identity.amazonaws.com:amr": "unauthenticated",
                  },
                },
              },
            ],
          },
          Policies: [
            {
              PolicyName: "cognito-auth-policy-aws04",
              PolicyDocument: {
                Version: "2012-10-17",
                Statement: [
                  {
                    Effect: "Allow",
                    Action: [
                      "mobileanalytics:PutEvents",
                      "cognito-sync:*",
                      "cognito-identity:*",
                    ],
                    Resource: "*",
                  },
                ],
              },
            },
          ],
        },
      },
      CognitoIdentityPoolRoleAttachment: {
        Type: "AWS::Cognito::IdentityPoolRoleAttachment",
        Properties: {
          IdentityPoolId: { Ref: "CognitoIdentityPool" },
          Roles: {
            authenticated: { "Fn::GetAtt": ["CognitoAuthRole", "Arn"] },
            unauthenticated: { "Fn::GetAtt": ["CognitoUnauthRole", "Arn"] },
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
