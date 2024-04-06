import {countItemsInLibrary} from "../database/itemsInLibraries";
import {getHistoryItemsInProfile} from "../database/itemsInProfiles";
import {getAllTagsInProfile} from "../database/tagsInProfiles";
import {getUserById} from "../database/user";
import {SimpleItem, User} from "../interfaces";
import {getSimpleItemInfoByUserId} from "./getItemInfo";

export async function getUserInfoByUserId(userId: number) {
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is not created.");
    return;
  }

  const itemsInProfiles = await getHistoryItemsInProfile(user.profileId);
  let historyItem: SimpleItem[] = [];
  for (const item of itemsInProfiles) {
    if (item) {
      const simpleItem = await getSimpleItemInfoByUserId(item.id);
      if (simpleItem) historyItem.push(simpleItem);
    }
  }

  const tagsInProfile = await getAllTagsInProfile(user.profileId);
  let preferences: string[] = [];
  for (const tag of tagsInProfile) {
    if (tag) preferences.push(tag?.name);
  }

  let count = await countItemsInLibrary(user.libraryId);

  const userResult: User = {
    id: user.id,
    email: user.email,
    name: user.userName,
    history: historyItem,
    countItemsInLibrary: count,
    preference: preferences,
  };

  return userResult;
}
