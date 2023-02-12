import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.users`,
  events: [
    {
      http: {
        method: "post",
        path: "users",
        authorizer: "aws_iam",
        cors: false,
      },
    },
  ],
};
