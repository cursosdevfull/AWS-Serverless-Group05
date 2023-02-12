import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.consumer`,
  events: [
    {
      http: {
        method: "post",
        path: "/consumer",
        integration: "lambda",
        authorizer: "authorizer",
      },
    },
  ],
};
