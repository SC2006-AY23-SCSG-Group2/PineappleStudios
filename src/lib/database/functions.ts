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
import {getSongById} from "./song";
import {getUserById} from "./user";

function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
