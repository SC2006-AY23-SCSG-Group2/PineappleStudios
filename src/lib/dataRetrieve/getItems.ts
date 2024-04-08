import {countItems, getItemById} from "../database/item";
import {SimpleItem} from "../interfaces";
import {getSimpleItemInfoByItemId} from "./getItemInfo";

async function getRandomItemsByType(type: string, count: number) {
  const Items: SimpleItem[] = [];
  let fetchedItems = 0;
  let itemId = 1; // Start from the first item id
  const totalItemCount = await countItems();
  if (!totalItemCount) {
    return Items;
  }
  // Fetch items until we have enough of the specified type or we reach the end of items in the database
  while (fetchedItems < count && itemId <= totalItemCount) {
    const item = await getItemById(itemId);
    if (item && item.itemType === type) {
      let simpleItemData = await getSimpleItemInfoByItemId(itemId);
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
) {
  // Initialize arrays to hold random items for each type
  const Books = await getRandomItemsByType("book", numberOfBooks);
  const Movies = await getRandomItemsByType("movie", numberOfMovies);
  const Songs = await getRandomItemsByType("song", numberOfSongs);

  // Return the combined array of random items
  return [...Books, ...Movies, ...Songs];
}
