import {User} from "@prisma/client";

import {prismaClient} from "./prisma";

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

export async function createUser(user: CreateUser) {
  try {
    return await prismaClient.user.create({data: user});
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

export async function deleteUser(id: number) {
  return await prismaClient.user.delete({
    where: {
      id,
    },
  });
}
