import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.appointmentHandler`,
  events: [
    {
      http: {
        path: "appointment",
        method: "post",
      },
    },
  ],
};
