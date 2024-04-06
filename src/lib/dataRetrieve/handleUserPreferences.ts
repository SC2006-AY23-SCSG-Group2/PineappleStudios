import {createTag, getTagByName} from "../database/tag";
import {
  createTagInProfileAssignments,
  deleteTagInProfileAssignment,
  getTagInProfileAssignment,
} from "../database/tagsInProfiles";
import {getUserById} from "../database/user";

export async function addPreferenceForUser(userId: number, preference: string) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  let tag = await getTagByName(preference);
  if (!tag) {
    tag = await createTag(preference);
    console.log("New tag : ", preference, " created");
  }
  //Sanity Check
  if (!tag) return;

  let preferenceCheck = await getTagInProfileAssignment(user.profileId, tag.id);
  if (!preferenceCheck) {
    preferenceCheck = await createTagInProfileAssignments(
      user.profileId,
      tag.id,
    );
  }
  console.log("The preference for user is created.");
  return preferenceCheck;
}

export async function removePreferenceForUser(
  userId: number,
  preference: string,
) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  let tag = await getTagByName(preference);
  if (!tag) {
    console.log("There is no preference : ", preference, " existed");
    return;
  }
  let preferenceCheck = await getTagInProfileAssignment(user.profileId, tag.id);
  if (preferenceCheck) {
    await deleteTagInProfileAssignment(user.profileId, tag.id);
    console.log("The preference : ", preference, "is removed");
  } else {
    console.log("The preference : ", preference, "is already removed");
  }
}
