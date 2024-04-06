import { Item } from "@prisma/client";
import {
  BookContent,
  ItemInfo,
  ItemType,
  MovieContent,
  People,
  SongContent,
} from "../interfaces";
import {getTagsFromItem} from "./TagsInItems";
import {getBookByItemId} from "./book";
import {getItemById} from "./item";
import {isItemInLibrary} from "./itemsInLibraries";
import {getMovieByItemId} from "./movie";
import {getPeopleFromItem} from "./peopleInItems";
import {
  createPreferenceForUser,
  deletePreference,
  getPreference,
} from "./preference";
import { prismaClient } from "./prisma";
import {getSongById} from "./song";
import {getUserById} from "./user";


function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function addPreferenceForUser(userId: number, preference: string) {
  let preferenceCheck = await getPreference(userId, preference);
  if (!preferenceCheck) {
    preferenceCheck = await createPreferenceForUser(userId, preference);
  }
  console.log("The preference for user is created.");
  return preferenceCheck;
}

export async function removePreferenceForUser(
  userId: number,
  preference: string,
) {
  let preferenceCheck = await getPreference(userId, preference);
  if (preferenceCheck) {
    await deletePreference(userId, preference);
    console.log("The preference : ", preference, "is removed");
  } else {
    console.log("The preference : ", preference, "is already removed");
  }
}

// import { PrismaClient, Library } from '@prisma/client';

// const prisma = new PrismaClient();

// interface LibraryInfo {
//   library: Library;
//   userId: number;
// }

// export async function getLibraryInfoByUserId(userId: number): Promise<LibraryInfo | null> {
//   try {
//     const userLibrary = await prisma.user.findUnique({
//       where: {
//         id: userId,
//       },
//       select: {
//         library: true,
//       },
//     });

//     if (!userLibrary) {
//       console.log(`User with ID ${userId} does not have a library.`);
//       return null;
//     }

//     const library = await prisma.library.findUnique({
//       where: {
//         id: userLibrary.library.id,
//       },
//       include: {
//         items: true,
//         folders: {
//           include: {
//             series: true,
//           },
//         },
//       },
//     });

//     // Check if the library exists
//     if (!library) {
//       console.log(`Library not found for user with ID ${userId}.`);
//       return null;
//     }

//     // Return the library along with the userId
//     return { library, userId };
//   } catch (error) {
//     console.error('Error fetching library info:', error);
//     return null;
//   }
// }

import { User, Folder, Library } from './../interfaces'; // Import necessary interfaces
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getTagNameById(tagId: number): Promise<string | null> {
  try {
    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    if (!tag) {
      console.error(`Tag with ID ${tagId} not found.`);
      return null;
    }

    return tag.name;
  } catch (error) {
    console.error('Error fetching tag name:', error);
    return null;
  }
}

export async function getLibraryInfoByUserId(userId: number): Promise<Library | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        library: {
          include: {
            folders: {
              include: {
                items: {
                  include: {
                    item: {
                      include: {
                        tags: true, // Include tags for each item
                      },
                    },
                  },
                },
                series: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      console.log(`User with ID ${userId} does not exist.`);
      return null;
    }

    const library: Library = {
      id: user.libraryId,
      userId: userId,
      items: [],
      folders: [],
      series: [],
    };

    // Process folders
    for (const folder of user.library.folders) {
      const value = (folder.series == null) ? false : true;
      const folderInfo: Folder = {
        id: folder.id,
        name: folder.name,
        isSeries: value, // Assuming regular folder by default
        img: '', // You need to determine how to get the folder image URL
        items: [],
      };


      // Process items in the folder
      for (const folderItem of folder.items) {
        const item = folderItem.item;
        const ids = item.tags.map(tag => tag.tagId);
        const tagNames = await Promise.all(ids.map(id => getTagNameById(id)));
        const nonNullTagNames = tagNames.filter(tagName => tagName !== null) as string[];
        const types = (item.itemType == "song") ? ItemType.Song : ((item.itemType == "book") ? ItemType.Book : ItemType.Movie);
        folderInfo.items.push({
          id: item.id,
          type: types,
          img: item.image,
          name: item.title,
          tag: nonNullTagNames, // Fill tags field with tag names
        });
      }

      library.folders.push(folderInfo);
    }

    // Process series
    for (const series of user.library.folders.filter(folder => folder.series)) {
      const seriesInfo: Folder = {
        id: series.series!.id,
        name: series.series!.name,
        isSeries: true,
        img: '', // You need to determine how to get the series image URL
        items: [], // Initialize items array
      };

      // Access the folder directly associated with the series using 'folderId'
      const folderId = series.series!.folderId;

      // Find the folder with the corresponding folderId
      const folder = user.library.folders.find(folder => folder.id === folderId);

      if (folder) {
        // Process items within the folder
        for (const folderItem of folder.items) {
          const item = folderItem.item;
          const ids = item.tags.map(tag => tag.tagId);
          const tagNames = await Promise.all(ids.map(id => getTagNameById(id)));
          const nonNullTagNames = tagNames.filter(tagName => tagName !== null) as string[];
          const types = (item.itemType == "song") ? ItemType.Song : ((item.itemType == "book") ? ItemType.Book : ItemType.Movie);
          seriesInfo.items.push({
            id: item.id,
            type: types,
            img: item.image,
            name: item.title,
            tag: nonNullTagNames, // Fill tags field with tag names
          });

        }
      } else {
        console.error(`Folder with ID ${folderId} not found.`);
      }

      library.series.push(seriesInfo);
    }

    return library;
  } catch (error) {
    console.error('Error fetching library info:', error);
    return null;
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

export async function getItemIdBySrcId(srcId: string): Promise<number | undefined> {
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

  const tagsFromItem = await getTagsFromItem(itemId);
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

export function getItemInfoExample(id: string): ItemInfo | undefined {
  const content: SongContent = {
    duration: 150,
    album: "album1",
  };

  function makePeople(): People[] {
    const returnList: People[] = [];
    for (let i = 0; i < 3; i++) {
      const id = randomInteger(0, 1084);
      const newItem: People = {
        name: `people${id}`,
        role: `role${id}`,
      };
      returnList.push(newItem);
    }

    return returnList;
  }

  if (isNaN(+id)) {
    const newId = randomInteger(0, 1084);
    return {
      id: newId,
      title: `title ${id}`,
      isInLibrary: !isNaN(+id),
      img: `https://picsum.photos/id/${randomInteger(0, 1084)}/200.webp`, // string of the url
      genre: ["genre1", "genre2"],
      tag: ["genre1", "genre2"],
      country: "Singapore",
      publicationDate: "2021-12-02",
      type: ItemType.Song, // movie song or book
      otherContent: content,
      people: makePeople(),
    };
  }

  return {
    id: +id,
    title: `title ${id}`,
    isInLibrary: !isNaN(+id),
    img: `https://picsum.photos/id/${randomInteger(0, 1084)}/200.webp`, // string
    // of
    // the
    // url
    genre: ["genre1", "genre2"],
    tag: ["genre1", "genre2"],
    country: "Singapore",
    publicationDate: "2021-12-02",
    type: ItemType.Song, // movie song or book
    otherContent: content,
    people: makePeople(),
  };
}
