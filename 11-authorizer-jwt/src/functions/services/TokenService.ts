import * as jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export class TokenService {
  static generateAccessToken(name: string, email: string): string {
    return jwt.sign({ name, email }, process.env.JWT_SECRET, {
      expiresIn: "30s",
    });
  }

  static generateRefreshToken(): string {
    return uuidv4();
  }

  static verifyAccessToken(accessToken: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  }
}
