import {countItemsInLibrary} from "../database/itemsInLibraries";
import {getHistoryItemsInProfile} from "../database/itemsInProfiles";
import {getAllPreferencesInProfile} from "../database/preferenceInProfile";
import {getUserById} from "../database/user";
import {SimpleItem, User} from "../interfaces";
import {getSimpleItemInfoByItemId} from "./getItemInfo";

export async function getUserInfoByUserId(userId: number): Promise<User> {
  const user = await getUserById(userId);
  if (!user) {
    console.log("User for userId: ", userId, " is invalid!");
    throw new Error(`User with ID ${userId} not found`);
  }

  const itemsInProfiles = await getHistoryItemsInProfile(user.profileId);
  let historyItem: SimpleItem[] = [];
  for (const item of itemsInProfiles) {
    if (item) {
      const simpleItem = await getSimpleItemInfoByItemId(item.id, userId);
      if (simpleItem) historyItem.push(simpleItem);
    }
  }

  const preferencesInProfile = await getAllPreferencesInProfile(user.profileId);
  let preferences: string[] = [];
  for (const preference of preferencesInProfile) {
    if (preference) preferences.push(preference?.name);
  }

  // Convert user.profile.registeredDate to Singapore time and format it
  const registeredDate = new Date(user.profile.registeredDate);
  const singaporeTimeOptions = {
    timeZone: "Asia/Singapore",
    month: "long" as const, // Ensure the month is specified as "long"
    day: "numeric" as const, // Ensure the day is specified as "numeric"
    year: "numeric" as const, // Ensure the year is specified as "numeric"
  };
  const formatter = new Intl.DateTimeFormat("en-US", singaporeTimeOptions);
  const formattedDateJoined = formatter.format(registeredDate);

  let count = await countItemsInLibrary(user.libraryId);
  const Name = user.userName ? user.userName : "";
  const userResult: User = {
    id: user.id,
    email: user.email,
    name: Name,
    //dateJoined: user.profile.registeredDate,
    dateJoined: formattedDateJoined,
    numberofLikedItem: user.profile.likedItem,
    numberOfRating: user.rate.length,
    timeUsedAppInMins: user.profile.timeUsedInApp,
    history: historyItem,
    countItemsInLibrary: count,
    preference: preferences,
  };

  return userResult;
}
