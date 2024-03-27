import {createItem, deleteItem} from "./item";
import {prismaClient} from "./prisma";

// getAllSongs
export const getAllSongs = async () => {
  try {
    const allSongs = await prismaClient.song.findMany({
      include: {
        item: true, // Include the associated Item data
      },
    });
    return allSongs;
  } catch (e) {
    console.log(e);
  }
};

// getSongById
export const getSongById = async (request: any) => {
  try {
    const songId = request.params.itemId;
    const song = await prismaClient.song.findUnique({
      where: {
        id: songId,
      },
      include: {
        item: true,
      },
    });
    return song;
  } catch (e) {
    console.log(e);
  }
};

// createSong
export const createSong = async (reqSong: any, reqItem: any) => {
  try {
    const songData = reqSong.body;
    const itemData = reqItem.body;

    // Create the song
    const song = await prismaClient.song.create({
      data: songData,
    });

    // Create the associated item
    const item = await createItem(itemData);
    return {song, item};
  } catch (error) {
    console.error("Error occurred while creating song:", error);
  }
};

// updateSong
export const updateSong = async (request: any) => {
  try {
    const songId = request.params.itemId;
    const songData = request.body;
    // Remove songId from songData to prevent updating it
    delete songData.itemId;
    delete songData.item;
    delete songData.srcId;

    const song = await prismaClient.song.update({
      where: {
        id: songId,
      },
      data: songData,
    });
    return song;
  } catch (e) {
    console.log(e);
  }
};

// deleteSong
export const deleteSong = async (request: any) => {
  try {
    const songId = request.params.itemId;
    let result = await deleteItem(songId); // Await the deleteItem function directly
    if (result) {
      await prismaClient.song.delete({
        where: {
          id: songId,
        },
      });
      return {success: true};
    } else {
      return {success: false, error: "Unable to delete item"};
    }
  } catch (e) {
    console.log(e);
    return {success: false};
  }
};
