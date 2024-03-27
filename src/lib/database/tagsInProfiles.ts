import { prismaClient } from "./prisma";
import { getTagById } from "./tag";
import { getProfileById } from "./profile";

// Return all the tags that are in a profile
export const getAllTagsInProfile = async (request: any) => {
    const profileId = request.params.id;
    
    try {
        // Retrieve all tag assignments for the given profile
        const tagAssignments = await prismaClient.tagsInProfiles.findMany({
            where: {
                profileId: profileId
            }
        });
        // Extract tag IDs from tag assignments
        const tagIds = tagAssignments.map(assignment => assignment.tagId);
        // Retrieve all tags by their IDs
        const allTagsInProfile = await Promise.all(tagIds.map(tagId => getTagById(tagId)));

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
                tagId: tagId
            }
        });

        const profileId = profileAssignments.map(assignment => assignment.profileId);
        const allProfilesUseSpecificTag = await Promise.all(profileId.map(profileId => getProfileById(profileId)));

        return allProfilesUseSpecificTag;
    } catch (error) {
        console.error("Error fetching profile for a specific tag:", error);
        throw error; 
    }
};

