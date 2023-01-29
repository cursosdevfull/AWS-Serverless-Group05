import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getone = async (event) => {
  console.log("event", event);

  const { body } = event;
  const { id } = JSON.parse(body);

  const result = await dynamodb
    .get({
      TableName: "Failures",
      Key: { id },
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
};

export { getone };
