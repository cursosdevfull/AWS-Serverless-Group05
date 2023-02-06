import { UserService } from "./UserService";

const register = async (event) => {
  const { name, email, password } = event.body;

  const user = await UserService.getUser(email);

  if (!user) {
    console.log("User not found. User can be created.");
  } else {
    console.log("User found. User cannot be created.");
  }
};

export { register };
