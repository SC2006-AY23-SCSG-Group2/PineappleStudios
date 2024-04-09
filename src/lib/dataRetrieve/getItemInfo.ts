import {getBookByItemId} from "../database/book";
import {getItemById} from "../database/item";
import {isItemInLibrary} from "../database/itemsInLibraries";
import {getMovieByItemId} from "../database/movie";
import {getPeopleFromItem} from "../database/peopleInItems";
import {prismaClient} from "../database/prisma";
import {getSongById} from "../database/song";
import {getTagsFromItem} from "../database/tag";
import {getUserById} from "../database/user";
import {
  BookContent,
  ItemInfo,
  ItemType,
  MovieContent,
  People,
  SimpleItem,
  SongContent,
} from "../interfaces";

export async function getItemInfoByItemId(
  itemId: number,
  userId: any,
): Promise<ItemInfo | undefined> {
  const user = await getUserById(userId);
  if (!user) {
    console.log("cannot find user");
    return undefined;
  }
  //return type is ItemInfo or undefined
  const item = await getItemById(itemId);
  if (!item) {
    console.log("Item not existing");
    return undefined;
  }
  let isItemInLibraryCheck: boolean;
  isItemInLibraryCheck = await isItemInLibrary(user.libraryId, itemId);

  let content: SongContent | MovieContent | BookContent | undefined; // Initialize content variable as undefined
  let itemType: ItemType;
  // Based on the item type, retrieve additional content information
  switch (item.itemType) {
    case "book":
      const book = await getBookByItemId(itemId);
      content = {
        pageCount: book?.pages ?? undefined,
      };
      itemType = ItemType.Book;
      break;
    case "movie":
      const movie = await getMovieByItemId(itemId);
      content = {
        duration: movie?.duration ?? undefined,
        country: item?.country ?? undefined,
      };
      itemType = ItemType.Movie;
      break;
    case "song":
      const song = await getSongById(itemId);
      content = {
        duration: song?.duration ?? undefined,
        album: song?.album ?? undefined,
      };
      itemType = ItemType.Song;
      break;
    default:
      console.log("Invalid item type:", item.itemType);
      return undefined; // Return undefined for invalid item types
  }

  const tagsFromItem = await getTagsFromItem(itemId, userId);
  let tags: string[] = []; // Initialize tags as an empty array

  if (tagsFromItem != undefined) {
    for (const tag of tagsFromItem) {
      if (tag) tags.push(tag?.name);
    }
  }

  let people: People[] = [];
  const peopleFromItem = await getPeopleFromItem(itemId);
  if (peopleFromItem != undefined) {
    for (const person of peopleFromItem) {
      if (person) {
        const data: People = {
          name: person.name,
          role: person.role,
        };
        people.push(data);
      }
    }
  }

  // export interface ItemInfo {
  //   id: number;
  //   title: string;
  //   isInLibrary: boolean;
  //   img: string; // string of the url
  //   genre: string[];
  //   tag: string[];
  //   country?: string;
  //   publicationDate?: string;
  //   type: ItemType; // movie song or book
  //   otherContent: MovieContent | SongContent | BookContent;
  //   people: People[];
  // }

  const itemInfo: ItemInfo = {
    id: itemId,
    title: item.title,
    isInLibrary: isItemInLibraryCheck,
    img: item.image,
    genre: item.genre.split(", "),
    tag: tags,
    country: item.country ?? undefined,
    publicationDate: item.publishedDate,
    type: itemType,
    otherContent: content,
    people: people,
  };

  return itemInfo;
}

export async function getItemIdBySrcId(
  srcId: string,
): Promise<number | undefined> {
  try {
    const movie = await prismaClient.movie.findFirst({
      where: {
        srcId,
      },
      select: {
        itemId: true,
      },
    });

    if (movie) return movie.itemId;

    const book = await prismaClient.book.findFirst({
      where: {
        srcId,
      },
      select: {
        itemId: true,
      },
    });

    if (book) return book.itemId;

    const song = await prismaClient.song.findFirst({
      where: {
        srcId,
      },
      select: {
        itemId: true,
      },
    });

    return song?.itemId;
  } catch (error) {
    console.error("Error fetching item id:", error);
    return undefined;
  }
}

export async function getItemInfoBySrcId(
  srcId: string,
  userId: number,
): Promise<ItemInfo | undefined> {
  const itemId = await getItemIdBySrcId(srcId);
  if (itemId === undefined) {
    console.log("Item ID not found for source ID:", srcId);
    return undefined;
  }
  return getItemInfoByItemId(itemId, userId);
}

export async function getSimpleItemInfoByItemId(
  itemId: number,
  userId: number,
): Promise<SimpleItem | undefined> {
  //return type is ItemInfo or undefined
  const item = await getItemById(itemId);
  if (!item) {
    console.log("Item not existing");
    return undefined;
  }
  //check item type,
  let itemType: ItemType;
  if (item.itemType == "book") {
    itemType = ItemType.Book;
  } else if (item.itemType == "movie") itemType = ItemType.Movie;
  else itemType = ItemType.Song;
  //get tags from item
  const tagsFromItem = await getTagsFromItem(itemId, userId);
  let tags: string[] = []; // Initialize tags as an empty array

  if (tagsFromItem != undefined) {
    for (const tag of tagsFromItem) {
      if (tag) tags.push(tag?.name);
    }
  }

  const simpleItemInfo: SimpleItem = {
    id: item.id,
    title: item.title,
    img: item.image,
    tag: tags,
    type: itemType,
  };

  return simpleItemInfo;
}
