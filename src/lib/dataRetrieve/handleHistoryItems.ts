import {getItemById} from "../database/item";
import {
  createItemInProfileAssignments,
  deleteItemInProfileAssignment,
  getItemInProfileAssignment,
} from "../database/itemsInProfiles";
import {getUserById} from "../database/user";

export async function addHistoryItemForUser(userId: number, itemId: number) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  const item = await getItemById(itemId);
  if (!item) {
    console.log("ItemId:  ", itemId, " is invalid");
    return;
  }

  let assignmentCheck = await getItemInProfileAssignment(
    user.profileId,
    itemId,
  );
  if (!assignmentCheck) {
    assignmentCheck = await createItemInProfileAssignments(
      user.profileId,
      itemId,
    );
    console.log("The history item for user is created.");
  } else {
    console.log("The history item for user is ALREADY created.");
  }
  return assignmentCheck;
}

export async function removeHistoryItemForUser(userId: number, itemId: number) {
  //sanity check
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }
  const item = await getItemById(itemId);
  if (!item) {
    console.log("ItemId:  ", itemId, " is invalid");
    return;
  }

  let assignmentCheck = await getItemInProfileAssignment(
    user.profileId,
    itemId,
  );
  if (assignmentCheck) {
    await deleteItemInProfileAssignment(user.profileId, itemId);
    console.log("The history item for user is removed.");
  } else {
    console.log("The history item for user is ALREADY removed.");
  }
}
