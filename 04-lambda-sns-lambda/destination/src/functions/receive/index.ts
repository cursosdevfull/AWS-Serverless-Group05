import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.receive`,
  events: [
    {
      sns: {
        arn: "${cf:origin04-dev.SNSTopicArn}",
        topicName: "SNSTopic04",
      },
    },
  ],
};
