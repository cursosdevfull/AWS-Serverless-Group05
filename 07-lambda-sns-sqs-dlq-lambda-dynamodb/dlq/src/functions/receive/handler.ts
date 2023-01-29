import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new AWS.DynamoDB.DocumentClient();

const receive = async (event) => {
  //throw new Error("An error occurred");

  const list = [];

  event.Records.forEach((record) => {
    const reg = JSON.parse(JSON.parse(record.body).Message);

    const info = {
      id: uuidv4(),
      user: reg.user,
      status: reg.status,
      date: reg.date,
      timestamp: new Date().getTime(),
    };

    const params = {
      TableName: "Failures",
      Item: info,
    };

    list.push(dynamodb.put(params).promise());
  });

  await Promise.all(list);

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
};

export { receive };
