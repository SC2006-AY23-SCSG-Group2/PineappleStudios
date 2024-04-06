import {prismaClient} from "./prisma";

// create preference
export const createPreferenceForUser = async (
  userId: number,
  preferenceName: string,
) => {
  try {
    const preference = await prismaClient.preference.create({
      data: {
        name: preferenceName,
        userId: userId,
      },
    });
    return preference;
  } catch (e) {
    console.error("Error occurred while creating preference for User:", e);
  }
};

//get preference using name and userId
export const getPreference = async (userId: number, preferenceName: string) => {
  try {
    const preference = await prismaClient.preference.findFirst({
      where: {
        name: preferenceName,
        userId: userId,
      },
    });
    return preference;
  } catch (e) {
    console.error("Error occured while getting preference : ", e);
  }
};

//delete a preference for a user
export const deletePreference = async (
  userId: number,
  preferenceName: string,
) => {
  try {
    return await prismaClient.preference.deleteMany({
      where: {
        name: preferenceName,
        userId: userId,
      },
    });
  } catch (e) {
    console.error("Error occured while deleting preference : ", e);
  }
};
