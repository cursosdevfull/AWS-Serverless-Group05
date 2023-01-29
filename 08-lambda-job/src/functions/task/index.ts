import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.task`,
  events: [
    {
      schedule: "rate(1 minute)",
      //schedule: "cron(0/1 * * * ? *)",
    },
  ],
};
