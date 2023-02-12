import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.generateNewAccessToken`,
  events: [
    {
      http: {
        method: "post",
        path: "/new-access-token",
      },
    },
  ],
};
