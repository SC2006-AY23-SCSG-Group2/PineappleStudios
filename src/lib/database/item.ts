import { prismaClient } from "./prisma";

// get all items
export const getAllitems = async () => {
  try {
    const allItems = await prismaClient.item.findMany();
    return allItems;
  } catch (e) {
    console.log(e);
  }
};

// get item By Id
export const getItemById = async (request: any) => {
  try {
    const itemId = request.params.id;
    const item = await prismaClient.item.findUnique({
      where: {
        id: itemId,
      },
    });
    return item;
  } catch (e) {
    console.log(e);
  }
};

// create item
export const createItem = async (request: any) => {
  try {
    const itemData = request.body;
    const item = await prismaClient.item.create({
      data: itemData,
    });
    return item;
  } catch (e) {
    console.log(e);
  }
};

// update item
export const updateItem = async (request: any) => {
  try {
    const itemId = request.params.itemId;
    const itemData = request.body;
    // Remove bookId from bookData to prevent updating it
    delete itemData.id;

    const item = await prismaClient.item.update({
      where: {
        id: itemId,
      },
      data: itemData,
    });
    return item;
  } catch (e) {
    console.log(e);
  }
};

// delete item
export const deleteItem = async (request: any) => {
    try {
      const itemId = request.params.id;
      await prismaClient.item.delete({
        where: {
          id: itemId,
        },
      });
      return true
    } catch (e) {
      console.log(e);
      return { success: false };
    }
};

