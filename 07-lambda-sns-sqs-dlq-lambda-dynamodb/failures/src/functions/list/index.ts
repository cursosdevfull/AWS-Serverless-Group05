import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.list`,
  events: [
    {
      http: {
        method: "post",
        path: "list",
      },
    },
  ],
};
