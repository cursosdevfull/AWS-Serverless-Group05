import * as AWS from 'aws-sdk';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const list = async (event) => {
  const result: any = await dynamodb.scan({ TableName: "Failures" }).promise();
  console.log(result);
  return {
    statusCode: 200,
    body: JSON.stringify(result.Items),
  };
};

export { list };
