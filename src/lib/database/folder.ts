import {prismaClient} from "./prisma";
const prisma = prismaClient;

// Create a new folder
export const createFolder = async (name: string, libraryId: number) => {
  try {
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
    console.error('Error occurred while creating folder:', error);
    return null;
  }
};

// Get folder by ID
export const getFolderById = async (folderId: number) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
    });
    return folder;
  } catch (error) {
    console.error('Error occurred while fetching folder by ID:', error);
    return null;
  }
};

// Update folder
export const updateFolder = async (folderId: number, name: string) => {
  try {
    const updatedFolder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name: name,
      },
    });
    return updatedFolder;
  } catch (error) {
    console.error('Error occurred while updating folder:', error);
    return null;
  }
};

// Delete folder by ID
export const deleteFolderById = async (folderId: number) => {
  try {
    await prisma.folder.delete({
      where: {
        id: folderId,
      },
    });
    return true;
  } catch (error) {
    console.error('Error occurred while deleting folder by ID:', error);
    return false;
  }
};
