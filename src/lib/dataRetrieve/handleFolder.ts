import {getFolderById, updateFolderName} from "../database/folder";
import {prismaClient} from "../database/prisma";

const prisma = prismaClient;

export async function updateFolderWithNewName(
  folderId: number,
  newFolderName: string,
) {
  const folder = await getFolderById(folderId);
  if (!folder) {
    console.error("Folder is not existing");
    return;
  }

  await updateFolderName(folderId, newFolderName);
  console.log("Folder name updated");
}

export async function addItemToFolder(
  libraryId: number,
  folderId: number,
  itemId: number,
) {
  try {
    // Check if the folder exists in the library
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        libraryId: libraryId,
      },
    });

    if (!folder) {
      console.log(
        `Folder with ID ${folderId} does not exist in the library with ID ${libraryId}`,
      );
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
    console.error("Error adding item to folder:", error);
    return false;
  }
}

export async function removeItemFromFolder(
  libraryId: number,
  folderId: number,
  itemId: number,
) {
  try {
    // Check if the folder exists in the library
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderId,
        libraryId: libraryId,
      },
    });

    if (!folder) {
      console.log(
        `Folder with ID ${folderId} does not exist in the library with ID ${libraryId}`,
      );
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
      console.log(
        `Item with ID ${itemId} does not exist in the folder with ID ${folderId}`,
      );
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
    console.error("Error removing item from folder:", error);
    return false;
  }
}
