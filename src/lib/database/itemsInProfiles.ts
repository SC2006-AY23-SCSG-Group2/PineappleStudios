import { prismaClient } from "./prisma";
import { getItemById } from "./item";
import { getProfileById } from "./profile";

//Return all history items in a profile
export const getHistoryItemsFromProfile = async(request : any) =>{
    const profileId = request.params.profileId;
    try{
        const itemAssignments = await prismaClient.itemsInProfiles.findMany({
            where : {
                profileId : profileId
            }
        });
    
        const itemIds = itemAssignments.map(assigment => assigment.itemId);
        const allItemsFromProfile = await Promise.all(itemIds.map(itemId => getItemById(itemId)));

        return allItemsFromProfile;
    }
    catch (e){
        console.error("Error fetching history items for profile:", e);
        throw e;
    }
    
};

//Return all profile using a specific history item
export const getProfileFromHistoryItem = async(request : any) =>{
    const itemId = request.params.itemId;
    try{
        const profileAssignments = await prismaClient.itemsInProfiles.findMany({
            where : {
                itemId: itemId
            }
        });
    
        const profileIds = profileAssignments.map(assigment => assigment.profileId);
        const allProfilesFromItem = await Promise.all(profileIds.map(profileId => getProfileById(profileId)));

        return allProfilesFromItem;
    }
    catch (e){
        console.error("Error fetching profile for history items:", e);
        throw e;
    }
};