import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.register`,
  events: [
    {
      http: {
        method: "post",
        path: "/register",
      },
    },
  ],
};
