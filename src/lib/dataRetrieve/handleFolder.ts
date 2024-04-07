import {prismaClient} from "../database/prisma"
import { getFolderByName } from "./../database/folder";
const prisma = prismaClient;

export async function addItemToFolder(libraryId: number, folderId: number, itemId: number) {
    try {
      // Check if the folder exists in the library
      const folder = await prisma.folder.findFirst({
        where: {
          id: folderId,
          libraryId: libraryId,
        },
      });
  
      if (!folder) {
        console.log(`Folder with ID ${folderId} does not exist in the library with ID ${libraryId}`);
        return false;
      }
  
      // Add the item to the folder
      await prisma.itemsInFolders.create({
        data: {
          folderId: folderId,
          itemId: itemId,
        },
      });
  
      return true; // Return true to indicate success
    } catch (error) {
      console.error('Error adding item to folder:', error);
      return false;
    }
  }
  
  export async function removeItemFromFolder(libraryId: number, folderId: number, itemId: number) {
    try {
      // Check if the folder exists in the library
      const folder = await prisma.folder.findFirst({
        where: {
          id: folderId,
          libraryId: libraryId,
        },
      });
  
      if (!folder) {
        console.log(`Folder with ID ${folderId} does not exist in the library with ID ${libraryId}`);
        return false;
      }
  
      // Check if the item exists in the folder
      const itemInFolder = await prisma.itemsInFolders.findFirst({
        where: {
          folderId: folderId,
          itemId: itemId,
        },
      });
  
      if (!itemInFolder) {
        console.log(`Item with ID ${itemId} does not exist in the folder with ID ${folderId}`);
        return false;
      }
  
      // Remove the item from the folder
      await prisma.itemsInFolders.delete({
        where: {
          folderId_itemId: {
            folderId: folderId,
            itemId: itemId,
          },
        },
      });
  
      return true; // Return true to indicate success
    } catch (error) {
      console.error('Error removing item from folder:', error);
      return false;
    }
  }


export const handleFolder = async (name: string, libraryId: number) => {
  try {
    // Check if a folder with the same name already exists in the library
    const existingFolder = await getFolderByName(name, libraryId);
    if (existingFolder) {
      throw new Error("Folder with the same name already exists in the library.");
    }

    // If no existing folder found, create a new folder
    const newFolder = await prisma.folder.create({
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
