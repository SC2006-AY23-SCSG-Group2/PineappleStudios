import {createPreference, getPreferenceByName} from "../database/preference";
import {
  createPreferenceInProfileAssignments,
  deletePreferenceInProfileAssignment,
  getPreferenceInProfileAssignment,
} from "../database/preferenceInProfile";
import {getUserById} from "../database/user";

export async function addPreferenceForUser(
  userId: number,
  preferenceName: string,
) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  let preference = await getPreferenceByName(preferenceName);
  if (!preference) {
    preference = await createPreference(preferenceName);
    console.log("New preference : ", preference, " created in database");
  }
  //Sanity Check
  if (!preference) return;

  let preferenceCheck = await getPreferenceInProfileAssignment(
    user.profileId,
    preference.id,
  );
  if (!preferenceCheck) {
    preferenceCheck = await createPreferenceInProfileAssignments(
      user.profileId,
      preference.id,
    );
  }
  console.log("The preference assignment for user is created.");
  return preferenceCheck;
}

export async function removePreferenceForUser(
  userId: number,
  preferenceName: string,
) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  let tag = await getPreferenceByName(preferenceName);
  if (!tag) {
    console.log(
      "There is no preference : ",
      preferenceName,
      " existed ofr user",
    );
    return;
  }
  let preferenceCheck = await getPreferenceInProfileAssignment(
    user.profileId,
    tag.id,
  );
  if (preferenceCheck) {
    await deletePreferenceInProfileAssignment(user.profileId, tag.id);
    console.log("The preference : ", preferenceName, "is removed");
  } else {
    console.log("The preference : ", preferenceName, "is already removed");
  }
}
