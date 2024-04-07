import {prismaClient} from "./prisma";

export const createRating = async (
  userId: number,
  itemId: number,
  rating: number,
) => {
  try {
    const rate = await prismaClient.rate.create({
      data: {
        userId: userId,
        itemId: itemId,
        rating: rating,
      },
    });
    return rate;
  } catch (error) {
    console.error("Error occurred while creating rating", error);
  }
};

export const countRating = async (userId: number) => {
  try {
    const count = await prismaClient.rate.count({
      where: {
        userId: userId,
      },
    });
  } catch (error) {
    console.error("Error occured while counting rate for user", error);
  }
};
