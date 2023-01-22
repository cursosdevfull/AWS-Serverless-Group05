import * as AWS from 'aws-sdk';

interface PublishMessageSNS {
  Message: string;
  TopicArn: string;
}

const sns = new AWS.SNS();

const send = async (event) => {
  const topicArn = process.env.SNS_TOPIC_ARN;
  const message = {
    user: "shidalgo",
    status: "active",
    date: new Date(),
  };

  const params: PublishMessageSNS = {
    Message: JSON.stringify(message),
    TopicArn: topicArn,
  };

  console.log("params", params);

  const result = await sns.publish(params).promise();
  console.log("result", result);

  return {
    statusCode: 200,
    body: "Message send",
  };
};

export { send };
