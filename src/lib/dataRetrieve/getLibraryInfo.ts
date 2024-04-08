// Import necessary interfaces
import {prismaClient} from "../database/prisma";
import {Folder, ItemType, Library, User} from "./../interfaces";

async function getTagNameByIdAndUserId(
  tagId: number,
  userId: number,
): Promise<string | null> {
  try {
    const tag = await prismaClient.tag.findUnique({
      where: {
        id: tagId,
        userId: userId,
      },
    });

    if (!tag) {
      console.error(`Tag with ID ${tagId} not found.`);
      return null;
    }

    return tag.name;
  } catch (error) {
    console.error("Error fetching tag name:", error);
    return null;
  }
}

export async function getLibraryInfoByUserId(
  userId: number,
): Promise<Library | null> {
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        library: {
          include: {
            items: {
              // Include items directly from the library
              include: {
                item: {
                  // Include item details
                  include: {
                    tags: true,
                  },
                },
              },
            },
            folders: {
              include: {
                items: {
                  include: {
                    item: {
                      include: {
                        tags: true,
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
      items: [], // Initialize items array
      folders: [],
      series: [],
    };

    // Process items directly from the library
    for (const libraryItem of user.library.items) {
      const item = libraryItem.item;
      const ids = item.tags.map((tag) => tag.id);
      const tagNames = await Promise.all(
        ids.map((id) => getTagNameByIdAndUserId(id, userId)),
      );
      const nonNullTagNames = tagNames.filter(
        (tagName) => tagName !== null,
      ) as string[];
      const types =
        item.itemType == "song"
          ? ItemType.Song
          : item.itemType == "book"
            ? ItemType.Book
            : ItemType.Movie;
      library.items.push({
        id: item.id,
        type: types,
        img: item.image,
        title: item.title,
        tag: nonNullTagNames,
      });
    }

    //image for folder
    function randomInteger(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    const fakeImg = `https://picsum.photos/id/${randomInteger(0, 1084)}/400/600.webp`;

    // Process folders
    for (const folder of user.library.folders) {
      const value = folder.series == null ? false : true;
      const folderInfo: Folder = {
        id: folder.id,
        name: folder.name,
        isSeries: value, // Assuming regular folder by default
        img: folder.items.length >= 1 ? folder.items[0].item.image : fakeImg,
        items: [],
      };

      // Process items in the folder
      for (const folderItem of folder.items) {
        const item = folderItem.item;
        const ids = item.tags.map((tag) => tag.id);
        const tagNames = await Promise.all(
          ids.map((id) => getTagNameByIdAndUserId(id, userId)),
        );
        const nonNullTagNames = tagNames.filter(
          (tagName) => tagName !== null,
        ) as string[];
        const types =
          item.itemType == "song"
            ? ItemType.Song
            : item.itemType == "book"
              ? ItemType.Book
              : ItemType.Movie;
        folderInfo.items.push({
          id: item.id,
          type: types,
          img: item.image,
          title: item.title,
          tag: nonNullTagNames, // Fill tags field with tag names
        });
      }

      library.folders.push(folderInfo);
    }

    // Process series
    for (const series of user.library.folders.filter(
      (folder) => folder.series,
    )) {
      const seriesInfo: Folder = {
        id: series.series!.id,
        name: series.series!.name,
        isSeries: true,
        img: "", // You need to determine how to get the series image URL
        items: [], // Initialize items array
      };

      // Access the folder directly associated with the series using 'folderId'
      const folderId = series.series!.folderId;

      // Find the folder with the corresponding folderId
      const folder = user.library.folders.find(
        (folder) => folder.id === folderId,
      );

      if (folder) {
        // Process items within the folder
        for (const folderItem of folder.items) {
          const item = folderItem.item;
          const ids = item.tags.map((tag) => tag.id);
          const tagNames = await Promise.all(
            ids.map((id) => getTagNameByIdAndUserId(id, userId)),
          );
          const nonNullTagNames = tagNames.filter(
            (tagName) => tagName !== null,
          ) as string[];
          const types =
            item.itemType == "song"
              ? ItemType.Song
              : item.itemType == "book"
                ? ItemType.Book
                : ItemType.Movie;
          seriesInfo.items.push({
            id: item.id,
            type: types,
            img: item.image,
            title: item.title,
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
    console.error("Error fetching library info:", error);
    return null;
  }
}
