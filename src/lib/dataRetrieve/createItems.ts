import { createSongItem } from "../database/songAPI";
import { createMovieItem } from "../database/movieAPI";
import { createBookItem } from "../database/bookAPI";

export const handleCreateItem = async (itemData: any) => {
  try {
    // Determine the item type
    const itemType = itemData.itemType;

    // Delegate creation based on the item type
    switch (itemType) {
      case 'song':
        return await createSongItem(itemData);
      case 'movie':
        return await createMovieItem(itemData);
      case 'book':
        return await createBookItem(itemData);
      default:
        throw new Error('Invalid item type');
    }
  } catch (error) {
    console.error(`Error occurred while creating item:`, error);
    return null;
  }
};
