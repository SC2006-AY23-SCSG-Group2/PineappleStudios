import {getFolderByName} from "../database/folder";
import {prismaClient} from "../database/prisma";

export const createFolder = async (name: string, libraryId: number) => {
  try {
    // Check if a folder with the same name already exists in the library
    const existingFolder = await getFolderByName(name, libraryId);
    if (existingFolder) {
      // throw new Error(
      //   "Folder with the same name already exists in the library.",
      // );
      console.error(
        "Error occurred while handling folder:",
        "Folder with the same name already exists in the library.",
      );
      return null;
    }

    // If no existing folder found, create a new folder
    const newFolder = await prismaClient.folder.create({
      data: {
        name: name,
        Library: {
          connect: {
            id: libraryId,
          },
        },
      },
    });
    return newFolder;
  } catch (error) {
    console.error("Error occurred while handling folder:", error);
    return null;
  }
};
