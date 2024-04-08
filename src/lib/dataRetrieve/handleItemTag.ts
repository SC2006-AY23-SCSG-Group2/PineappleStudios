import {
  createTag,
  deleteTag,
  getTagByNameAndUserIdAndItemId,
} from "../database/tag";
import {getUserById} from "../database/user";

export async function addItemToFavourtie(userId: number, itemId: number) {
  const tag = await addTagForItem(userId, "favourite", itemId);
  if (!tag) {
    return {error: "Error occured when adding item to favourite"};
  }
}

export async function removeItemFromFavourite(userId: number, itemId: number) {
  const tag = await removeTagForItem(userId, "favourite", itemId);
}

export async function addTagForItem(
  userId: number,
  newTagName: string,
  itemId: number,
) {
  const user = await getUserById(userId);
  if (!user) {
    return {error: "User for userId " + userId + " is invalid."};
  }

  let tag = await getTagByNameAndUserIdAndItemId(newTagName, userId, itemId);

  if (!tag) {
    tag = await createTag(newTagName, userId, itemId);
    console.log("New tag : ", newTagName, " created");
  } else {
    console.error("Tag : ", newTagName, " is ALREADY created");
  }
  return tag;
}

export async function removeTagForItem(
  userId: number,
  tagName: string,
  itemId: number,
) {
  const user = await getUserById(userId);
  if (!user) {
    return {error: "User for userId " + userId + " is invalid."};
  }

  let tag = await getTagByNameAndUserIdAndItemId(tagName, userId, itemId);

  if (tag) {
    await deleteTag(tag.id);
    console.log("Tag : ", tagName, " is removed for userId : ", userId);
  } else {
    console.log("Tag : ", tagName, " is ALREADY removed for userId : ", userId);
  }
  return tag;
}
