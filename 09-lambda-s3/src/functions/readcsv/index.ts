import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.readcsv`,
  events: [
    {
      s3: {
        bucket: "bucket-agenda-medica",
        event: "s3:ObjectCreated:*",
        rules: [
          {
            suffix: ".csv",
          },
          {
            prefix: "agenda/",
          },
        ],
      },
    },
  ],
};
