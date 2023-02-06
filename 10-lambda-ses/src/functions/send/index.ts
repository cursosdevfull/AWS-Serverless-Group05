import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.send`,
  events: [
    {
      http: {
        method: "post",
        path: "send",
      },
    },
  ],
};
