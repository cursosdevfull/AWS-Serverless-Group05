import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.read`,
  events: [
    {
      s3: {
        bucket: "bucket-agenda",
        event: "s3:ObjectCreated:*",
        existing: true,
        rules: [
          {
            suffix: ".csv",
          },
          {
            prefix: "agenda/",
          }
        ]
      },
    },
  ],
};
