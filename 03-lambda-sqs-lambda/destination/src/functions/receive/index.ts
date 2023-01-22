import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.receive`,
  events: [
    {
      sns: {
        topicName: "SNSTopic04",
        arn: "${cf:origin04-dev.SNSTopicArn}",
      },
    },
  ],
};
