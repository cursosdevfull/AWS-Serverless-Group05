import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.login`,
  events: [
    {
      http: {
        method: "post",
        path: "/login",
      },
    },
  ],
};
