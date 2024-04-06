import {prismaClient} from "./prisma";
import {getProfileById} from "./profile";
import {getTagById} from "./tag";

export const createTagInProfileAssignments = async (
  profileId: number,
  tagId: number,
) => {
  try {
    const assignment = await prismaClient.tagsInProfiles.create({
      data: {
        profileId: profileId,
        tagId: tagId,
      },
    });
    return assignment;
  } catch (error) {
    console.error(
      "Error occurred while creating Tag in Profile assignment:",
      error,
    );
  }
};

export const deleteTagInProfileAssignment = async (
  profileId: number,
  tagId: number,
) => {
  try {
    await prismaClient.tagsInProfiles.deleteMany({
      where: {
        profileId: profileId,
        tagId: tagId,
      },
    });
  } catch (error) {
    console.error(
      "Error occured while deleting tag in Profile assignment: ",
      error,
    );
  }
};

export const getTagInProfileAssignment = async (
  profileId: number,
  tagId: number,
) => {
  try {
    const assignment = await prismaClient.tagsInProfiles.findFirst({
      where: {
        profileId: profileId,
        tagId: tagId,
      },
    });
    return assignment;
  } catch (error) {
    console.error("Error occured while getting tag in profile", error);
  }
};

// Return all the tags that are in a profile
export const getAllTagsInProfile = async (profileId: number) => {
  try {
    // Retrieve all tag assignments for the given profile
    const tagAssignments = await prismaClient.tagsInProfiles.findMany({
      where: {
        profileId: profileId,
      },
    });
    // Extract tag IDs from tag assignments
    const tagIds = tagAssignments.map((assignment) => assignment.tagId);
    // Retrieve all tags by their IDs
    const allTagsInProfile = await Promise.all(
      tagIds.map((tagId) => getTagById(tagId)),
    );

    return allTagsInProfile;
  } catch (error) {
    console.error("Error fetching tags for profile:", error);
    throw error;
  }
};

//Return all the profiles that are using a specific tag as preferences
export const getAllProfilesUseSpecificTag = async (request: any) => {
  const tagId = request.params.id;

  try {
    const profileAssignments = await prismaClient.tagsInProfiles.findMany({
      where: {
        tagId: tagId,
      },
    });

    const profileId = profileAssignments.map(
      (assignment) => assignment.profileId,
    );
    const allProfilesUseSpecificTag = await Promise.all(
      profileId.map((profileId) => getProfileById(profileId)),
    );

    return allProfilesUseSpecificTag;
  } catch (error) {
    console.error("Error fetching profile for a specific tag:", error);
    throw error;
  }
};
