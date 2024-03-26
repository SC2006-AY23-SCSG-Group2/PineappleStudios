import {User} from "@prisma/client";

import {prismaClient} from "./prisma";
import { createProfile,deleteProfile} from "./profile";

export type GetAllUsers = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type CreateUser = {
  name: string;
  email: string;
  password: string;
};

export type UpdateUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
};

export async function getAllUsers() {
  return await prismaClient.user.findMany();
}

export async function getUserByEmail(email: string) {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
}

export async function createUser(reqUser : any ) {
  try {
    const userData  = reqUser.body;
    const user = await prismaClient.user.create({
      data : userData
    });
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function updateUser(id: number, user: User) {
  return await prismaClient.user.update({
    where: {
      id,
    },
    data: user,
  });
}

export async function updatePassword(email: string, newPassword: string) {
  return await prismaClient.user.update({
    where: {
      email,
    },
    data: {
      password: newPassword,
    },
  });
}


export async function deleteUser(id: number, request: any) {
  const profileId = request.params.profileId;
  await deleteProfile(profileId); // Ensure to await the deletion of profile
  return await prismaClient.user.delete({
    where: {
      id,
    },
  });
}

// Function to update accumulated app usage time for a user //Pass in argument (profileId and latestAppUsageTime) to update timeUsedInApp
export async function updateUserAppUsage(request: any, latestAppUsageTime: number) {
  try {
    // Retrieve the profileId from the request parameter
    const profileId = request.params.profileId;
    const userProfile = await prismaClient.profile.findUnique({
      where: { id: profileId },
    });

    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // Calculate the new total usage time by adding latestAppUsageTime to existing total
    const newTotalUsageTime = (userProfile.timeUsedInApp || 0) + latestAppUsageTime;

    // Update the timeUsedInApp field in the user's profile with the new total usage time
    await prismaClient.profile.update({
      where: { id: profileId },
      data: { timeUsedInApp: newTotalUsageTime },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
  }
}



