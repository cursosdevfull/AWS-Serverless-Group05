import { TokenService } from "@functions/services/TokenService";
import { UserService } from "@functions/services/UserService";

const generateNewAccessToken = async (event): Promise<any> => {
  const { refreshToken } = JSON.parse(event.body);

  const results = await UserService.getUserByRefreshToken(refreshToken);

  if (results && results.length > 0) {
    const user = results[0];
    const accessToken = TokenService.generateAccessToken(user.name, user.email);
    const newRefreshToken = TokenService.generateRefreshToken();

    await UserService.update(user.email, newRefreshToken);

    return {
      statusCode: 200,
      body: JSON.stringify({
        accessToken,
        refreshToken: newRefreshToken,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({
        message: "Invalid refresh token",
      }),
    };
  }
};

export { generateNewAccessToken };
