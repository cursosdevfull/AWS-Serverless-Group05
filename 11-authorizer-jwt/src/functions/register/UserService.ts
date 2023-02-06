import * as AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class UserService {
  static async getUser(email: string) {
    const params = {
      TableName: "UserTable",
      Key: { email },
    };

    const user = await dynamoDb.get(params).promise();

    return user.Item;
  }

  static async createUser(email: string, name: string, password: string) {
    const params = {
      TableName: "UserTable",
      Item: {
        email,
        name,
        password,
        refreshToken: null,
        createdAt: new Date(),
      },
    };

    await dynamoDb.put(params).promise();
  }
}
