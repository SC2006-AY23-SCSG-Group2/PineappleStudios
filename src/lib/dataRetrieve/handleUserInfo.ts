import {getSession} from "src/app/session";

import {decrementLikedItems, incrementLikedItems} from "../database/profile";
import {getUserByEmail, getUserById, updateUser} from "../database/user";

export async function updateUserEmail(userId: number, newUserEmail: string) {
  const user = await getUserById(userId);
  //sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }

  if (user.email === newUserEmail) {
    return {error: `Current user email is ${newUserEmail} already.`};
  }

  const userCheck = await getUserByEmail(newUserEmail);
  if (userCheck) {
    return {
      error: `${newUserEmail} is currently used by another user. Please use another email address.`,
    };
  }

  const data = {
    body: {
      email: newUserEmail,
    },
  };

  const updatedUser = await updateUser(userId, data);
  return {
    message: `New user email changed from ${user.email} to ${updatedUser.email}`,
  };
}

export async function updatePassword(userId: number, newPassword: string) {
  const user = await getUserById(userId);
  // Sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }

  if (user.password === newPassword) {
    return {error: `Current user password is ${newPassword} already.`};
  }

  // Update only the password field
  const data = {
    body: {
      password: newPassword,
    },
  };

  const updatedUser = await updateUser(userId, data);
  return {
    message: "Password updated successfully.",
  };
}

export async function updateUserName(userId: number, newUserName: string) {
  const user = await getUserById(userId);
  //sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }

  if (user.userName === newUserName) {
    return {error: `Current user email is ${newUserName} already.`};
  }

  const data = {
    body: {
      userName: newUserName,
    },
  };

  const updatedUser = await updateUser(userId, data);
  return {
    message: `New user name changed from ${user.userName} to ${updatedUser.userName}`,
  };
}

export async function incrementLikedItemsByOne(userId: number) {
  const user = await getUserById(userId);
  //sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }
  await incrementLikedItems(user.profileId);
  return {message: `LikedItem for userID ${userId} incremented by one`};
}

export async function decrementLikedItemsByOne(userId: number) {
  const user = await getUserById(userId);
  //sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }

  if (user.profile.likedItem <= 0) {
    return {error: `LikedItem for userID ${userId} is already ZERO.`};
  }

  await decrementLikedItems(user.profileId);
  return {message: `LikedItem for userID ${userId} incremented by one`};
}

export async function calculateUsageTimeInMinutes(
  oldStartTime: Date,
): Promise<number> {
  const currentTime = new Date();

  const timeDifferenceInMilliseconds =
    currentTime.getTime() - oldStartTime.getTime();

  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60); // Convert milliseconds to minutes

  return Math.floor(timeDifferenceInMinutes); // Return the usage time in minutes rounded down
}

export async function updateUserTimeUsedInApp(
  userId: number,
  timeUsedInMins: number,
) {
  const user = await getUserById(userId);
  //sanity check
  if (!user) {
    return {error: "The userId is invalid!"};
  }
  updateUserTimeUsedInApp(user.profileId, timeUsedInMins);
  return {message: "Updated time used in app"};
}
