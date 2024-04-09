import { prismaClient } from "../database/prisma";

const prisma = prismaClient;

export async function addFolderToLibrary(userId: number, libraryId: number, folderId: number) {
  try {
    // Fetch the user to ensure it exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log(`User with ID ${userId} does not exist.`);
      return false;
    }

    // Fetch the library to ensure it exists
    const library = await prisma.library.findUnique({
      where: {
        id: libraryId,
      },
    });

    if (!library) {
      console.log(`Library with ID ${libraryId} does not exist.`);
      return false;
    }

    // Fetch the folder to ensure it exists
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
    });

    if (!folder) {
      console.log(`Folder with ID ${folderId} does not exist.`);
      return false;
    }

    // Add the folder to the library
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        Library: {
          connect: {
            id: libraryId,
          },
        },
      },
    });

    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error adding folder to library:", error);
    return false;
  }
}

export async function removeFolderFromLibrary(userId: number, libraryId: number, folderId: number) {
  try {
    // Fetch the user to ensure it exists
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      console.log(`User with ID ${userId} does not exist.`);
      return false;
    }

    // Fetch the library to ensure it exists
    const library = await prisma.library.findUnique({
      where: {
        id: libraryId,
      },
    });

    if (!library) {
      console.log(`Library with ID ${libraryId} does not exist.`);
      return false;
    }

    // Check if the folder exists in the library
    const folderInLibrary = await prisma.folder.findFirst({
      where: {
        id: folderId,
        libraryId: libraryId,
      },
    });

    if (!folderInLibrary) {
      console.log(`Folder with ID ${folderId} is not in the library.`);
      return false;
    }

    // Remove the folder from the library
    await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        Library: {
          disconnect: true,
        },
      },
    });

    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error removing folder from library:", error);
    return false;
  }
}




