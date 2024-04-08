import {createFolder} from "../database/folder";
import {createUser, getUserByEmail} from "../database/user";

export async function createNewUser(
  email: string,
  userName: string,
  password: string,
) {
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return {error: "You already have an account"};
  }
  const user = await createUser(email, userName, password);
  if (user) await createFolder("Favourite", user?.libraryId);
  console.log("User created successfully.");
  return user;
}
