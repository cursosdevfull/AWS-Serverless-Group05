import * as AWS from 'aws-sdk';

interface SendMessageSQS {
  MessageBody: string;
  QueueUrl: string;
}

const sqs = new AWS.SQS();

const send = async (event) => {
  const queueUrl = process.env.SQS_QUEUE_URL;
  const message = {
    user: "shidalgo",
    status: "active",
    date: new Date(),
  };

  const params: SendMessageSQS = {
    MessageBody: JSON.stringify(message),
    QueueUrl: queueUrl,
  };

  console.log("params", params);

  const result = await sqs.sendMessage(params).promise();
  console.log("result", result);

  return {
    statusCode: 200,
    body: "Message send",
  };
};

export { send };
