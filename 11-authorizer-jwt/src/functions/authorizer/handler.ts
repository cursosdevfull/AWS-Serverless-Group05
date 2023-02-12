import { TokenService } from "@functions/services/TokenService";

import { PolicyService } from "../services/PolicyService";

const authorizer = async (event) => {
  const { authorizationToken, methodArn } = event;

  try {
    const payload = await TokenService.verifyAccessToken(authorizationToken);
    console.log(payload);
    return PolicyService.generate("user", "Allow", methodArn);
  } catch (error) {
    return PolicyService.generate("user", "Deny", methodArn);
  }
};

export { authorizer };
