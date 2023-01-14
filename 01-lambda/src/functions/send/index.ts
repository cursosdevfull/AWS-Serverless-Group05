import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.sendHandler`,
  events: [
    {
      http: {
        path: "prueba2",
        method: "post",
      },
    },
  ],
};
