import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.pruebaHandler`,
  events: [
    {
      http: {
        path: "prueba",
        method: "post",
      },
    },
  ],
};
