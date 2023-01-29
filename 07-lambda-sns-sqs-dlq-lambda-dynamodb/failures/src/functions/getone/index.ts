import { handlerPath } from '@libs/handler-resolver';

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
};

export default {
  handler: `${handlerPath(__dirname)}/handler.getone`,
  events: [
    {
      http: {
        method: "post",
        path: "getone",
        request: {
          schemas: {
            "application/json": schema,
          },
        },
      },
    },
  ],
};
