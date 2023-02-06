import { handlerPath } from "@libs/handler-resolver";

import schema from "./schema";

export default {
  handler: `${handlerPath(__dirname)}/handler.register`,
  events: [
    {
      http: {
        method: "post",
        path: "/register",
        request: {
          schema: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
