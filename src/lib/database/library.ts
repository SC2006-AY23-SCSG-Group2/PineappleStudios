import { PrismaClient, Item } from "@prisma/client";
import {prismaClient} from "./prisma";

const prisma = new PrismaClient();

// get Library By Id
export const getLiraryById = async (request: any) => {
  try {
    const libraryId = request.params.id;
    const library = await prismaClient.library.findUnique({
      where: {
        id: libraryId,
      },
    });
    return library;
  } catch (e) {
    console.log(e);
  }
};

// create library
export const createLibrary = async () => {
  try {
    //   const libraryData = request.body;

    // Create the song
    const library = await prismaClient.library.create({
      // data: libraryData,
    });

    return library;
  } catch (error) {
    console.error("Error occurred while creating library:", error);
  }
};

// update library
export const updateLibrary = async (request: any) => {
  try {
    const libraryId = request.params.id;
    const libraryData = request.body;
    // Remove songId from songData to prevent updating it
    delete libraryData.itemId;
    delete libraryData.user;

    const library = await prismaClient.library.update({
      where: {
        id: libraryId,
      },
      data: libraryData,
    });
    return library;
  } catch (e) {
    console.log(e);
  }
};

// delete library
export const deleteLibrary = async (request: any) => {
  try {
    const libraryId = request.params.id;
    //Need to delete folders also
    await prismaClient.library.delete({
      where: {
        id: libraryId,
      },
    });
    return {success: true};
  } catch (e) {
    console.log(e);
    return {success: false};
  }
};

export async function addItemToLibrary(userId: number, libraryId: number, itemId: number) {
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

    // Add the item to the library
    await prisma.itemsInLibraries.create({
      data: {
        libraryId: libraryId,
        itemId: itemId, // Use the provided item ID
      },
    });

    return true; // Return true to indicate success
  } catch (error) {
    console.error('Error adding item to library:', error);
    return false;
  }
}

export async function removeItemFromLibrary(userId: number, libraryId: number, itemId: number) {
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

    // Check if the item exists in the library
    const itemInLibrary = await prisma.itemsInLibraries.findFirst({
      where: {
        libraryId: libraryId,
        itemId: itemId,
      },
    });

    if (!itemInLibrary) {
      console.log(`Item with ID ${itemId} is not in the library.`);
      return false;
    }

    // Remove the item from the library
    await prisma.itemsInLibraries.delete({
      where: {
        libraryId_itemId: {
          libraryId: libraryId,
          itemId: itemId,
        },
      },
    });

    return true; // Return true to indicate success
  } catch (error) {
    console.error('Error removing item from library:', error);
    return false;
  }
}