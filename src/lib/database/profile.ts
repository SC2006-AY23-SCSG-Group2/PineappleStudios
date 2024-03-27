import {prismaClient} from "./prisma";

// get profile by id
export const getProfileById = async (request: any) => {
  try {
    const profileId = request.params.id;
    const profile = await prismaClient.profile.findUnique({
      where: {
        id: profileId,
      },
      include: {
        user: true, //also fetch "User"
      },
    });
    return profile;
  } catch (e) {
    console.log(e);
  }
};

// create profile
export const createProfile = async () => {
  try {
    // const profileData = request.body;
    const profile = await prismaClient.profile.create({
      // data: profileData,
      data : {
        registeredDate: new Date() // Set the current date and time, workaround
      }
    });
    return profile;
  } catch (e) {
    console.error("Error occurred while creating profile:", e);
  }
};

// update  profile
export const updateProfile = async (request: any) => {
  try {
    const profileId = request.params.id;
    const profileData = request.body;
    // Remove bookId from bookData to prevent updating it
    delete profileData.id;

    const profile = await prismaClient.profile.update({
      where: {
        id: profileId,
      },
      data: profileData,
    });
    return profile;
  } catch (e) {
    console.log(e);
  }
};

// delete profile
export const deleteProfile = async (request: any) => {
  try {
    const profileId = request.params.id;
    const profile = await prismaClient.profile.delete({
      where: {
        id: profileId,
      },
    });
    return {success: true};
  } catch (e) {
    console.log(e);
  }
};

// Function to update accumulated app usage time for a user //Pass in argument (profileId and latestAppUsageTime) to update timeUsedInApp
export async function updateUserAppUsage(
  request: any,
  latestAppUsageTime: number,
) {
  try {
    // Retrieve the profileId from the request parameter
    const profileId = request.params.profileId;
    const userProfile = await prismaClient.profile.findUnique({
      where: {id: profileId},
    });

    if (!userProfile) {
      throw new Error("User profile not found");
    }

    // Calculate the new total usage time by adding latestAppUsageTime to existing total
    const newTotalUsageTime =
      (userProfile.timeUsedInApp || 0) + latestAppUsageTime;

    // Update the timeUsedInApp field in the user's profile with the new total usage time
    await prismaClient.profile.update({
      where: {id: profileId},
      data: {timeUsedInApp: newTotalUsageTime},
    });

    return {success: true};
  } catch (error) {
    console.log(error);
  }
}
