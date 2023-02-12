import { TokenService } from "@functions/services/TokenService";
import { UserService } from "@functions/services/UserService";

import { BcryptService } from "../services/BcryptService";

const login = async (event): Promise<any> => {
  const { email, password } = JSON.parse(event.body);

  const user = await UserService.getUser(email);

  if (user) {
    const isMatch = await BcryptService.compare(password, user.password);

    if (isMatch) {
      const accessToken = TokenService.generateAccessToken(
        user.name,
        user.email
      );

      return {
        statusCode: 200,
        body: JSON.stringify({
          accessToken,
          refreshToken: user.refreshToken,
        }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: "Invalid credentials",
        }),
      };
    }
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Invalid credentials",
      }),
    };
  }
};

export { login };
