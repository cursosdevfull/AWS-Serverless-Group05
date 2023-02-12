import { BcryptService } from "../services/BcryptService";
import { UserService } from "../services/UserService";

const register = async (event) => {
  let { name, email, password } = JSON.parse(event.body);

  const user = await UserService.getUser(email);

  if (!user) {
    password = await BcryptService.hash(password);
    await UserService.createUser(email, name, password);

    return {
      statusCode: 200,
      body: "User registered successfully.",
    };
  } else {
    return {
      statusCode: 400,
      body: "User already exists.",
    };
  }
};

export { register };
