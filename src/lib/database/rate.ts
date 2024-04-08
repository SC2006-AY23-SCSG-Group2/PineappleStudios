import {prismaClient} from "./prisma";

const prisma = prismaClient;

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

// Get average rating for an item
export const getAverageRatingByItemId = async (itemId: number) => {
  try {
    const ratings = await prisma.rate.findMany({
      where: {
        itemId: itemId,
      },
      select: {
        rating: true,
      },
    });

    // Calculate the average rating manually
    const totalRatings = ratings.length;
    if (totalRatings === 0) {
      return 0; // Return 0 if there are no ratings for the item
    }

    const sumOfRatings = ratings.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = sumOfRatings / totalRatings;

    return averageRating;
  } catch (error) {
    console.error(
      "Error occurred while fetching average rating for item:",
      error,
    );
    return 0; // Return 0 in case of error
  }
};

// Update a rating
export const updateRating = async (ratingId: number, newRating: number) => {
  try {
    const updatedRating = await prisma.rate.update({
      where: {
        id: ratingId,
      },
      data: {
        rating: newRating,
      },
    });
    return updatedRating;
  } catch (error) {
    console.error("Error occurred while updating rating:", error);
    return null;
  }
};

// Delete a rating
export const deleteRating = async (ratingId: number) => {
  try {
    await prisma.rate.delete({
      where: {
        id: ratingId,
      },
    });
    return true;
  } catch (error) {
    console.error("Error occurred while deleting rating:", error);
    return false;
  }
};
