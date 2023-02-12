import * as AWS from "aws-sdk";

import { TokenService } from "./TokenService";

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
        refreshToken: TokenService.generateRefreshToken(),
        createdAt: new Date().toISOString(),
      },
    };

    await dynamoDb.put(params).promise();
  }

  static async getUserByRefreshToken(refreshToken: string) {
    const params = {
      TableName: "UserTable",
      FilterExpression: "refreshToken = :refreshToken",
      ExpressionAttributeValues: {
        ":refreshToken": refreshToken,
      },
    };

    const result = await dynamoDb.scan(params).promise();

    return result.Items;
  }

  static async update(email: string, refreshToken: string) {
    const params = {
      TableName: "UserTable",
      Key: { email },
      UpdateExpression: "set refreshToken = :refreshToken",
      ExpressionAttributeValues: {
        ":refreshToken": refreshToken,
      },
    };

    await dynamoDb.update(params).promise();
  }
}
