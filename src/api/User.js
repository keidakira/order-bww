// All user related APIs go here
import client from "../api";

class User {
  checkUserExists = async (email) => {
    const response = await client.get(`/auth/user/exists/${email}`);
    return response;
  };

  createUser = async (user) => {
    const newUser = {
      email: user.email,
      password: user.password,
      name: user.name,
      nickname: user.name.split(" ")[0],
    };

    const response = await client.post("/auth/user/create", newUser);
    return response;
  };

  loginUser = async (user) => {
    try {
      const response = await client.post("/auth/login", user);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default User;
