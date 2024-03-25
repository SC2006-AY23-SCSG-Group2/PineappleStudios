import {Song} from "@prisma/client";
import { prismaClient } from "./prisma";
import { url } from "inspector";

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
    const songId = request.params.id;
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
export const createSong = async (request: any) => {
  try {
    const songData = request.body;
    const song = await prismaClient.song.create({
      data: songData,
    });
    return song;
  } catch (e) {
    console.log(e);
  }
};

// updateSong
export const updateSong = async (request: any) => {
  try {
    const songId = request.params.itemId;
    const songData = request.body;
    // Remove songId from songData to prevent updating it
    delete songData.songId;

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
    const songId = request.params.id;
    const song = await prismaClient.song.delete({
      where: {
        id: songId,
      },
    });
    return song;
  } catch (e) {
    console.log(e);
  }
};
export const searchSongs = async (searchValue: string, accessToken: string) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchValue)}&type=track`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch songs');
    }

    const responseData = await response.json();
    return responseData.tracks.items;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return [];
  }
};
