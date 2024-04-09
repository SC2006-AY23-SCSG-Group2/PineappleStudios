import {countItems, getItemById} from "../database/item";
import {SimpleItem} from "../interfaces";
import {getSimpleItemInfoByItemId} from "./getItemInfo";

async function getRandomItemsByType(
  type: string,
  count: number,
  userId: number,
): Promise<SimpleItem[]> {
  const Items: SimpleItem[] = [];
  let fetchedItems: number = 0;
  let itemId: number = 1; // Start from the first item id
  const totalItemCount: number | undefined = await countItems();
  if (!totalItemCount) {
    return Items;
  }
  // Fetch items until we have enough of the specified type or we reach the end of items in the database
  while (fetchedItems < count && itemId <= totalItemCount) {
    const item = await getItemById(itemId);
    if (item && item.itemType === type) {
      const simpleItemData = await getSimpleItemInfoByItemId(itemId, userId);
      if (simpleItemData) Items.push(simpleItemData);
      fetchedItems++;
    }
    itemId++;
  }
  return Items;
}

export async function getMultipleSimpleItems(
  numberOfBooks: number,
  numberOfMovies: number,
  numberOfSongs: number,
  userId: number,
): Promise<SimpleItem[]> {
  // Initialize arrays to hold random items for each type
  const Books: SimpleItem[] = await getRandomItemsByType(
    "book",
    numberOfBooks,
    userId,
  );
  const Movies: SimpleItem[] = await getRandomItemsByType(
    "movie",
    numberOfMovies,
    userId,
  );
  const Songs: SimpleItem[] = await getRandomItemsByType(
    "song",
    numberOfSongs,
    userId,
  );

  // Return the combined array of random items
  return [...Books, ...Movies, ...Songs];
}
