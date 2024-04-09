import { prismaClient } from "./prisma";

export const getAllSeries = async () => {
  try {
    const allSeries = await prismaClient.series.findMany({
      include: {
        folder: true, // Include the associated folder data
      },
    });
    return allSeries;
  } catch (e) {
    console.log(e);
  }
};

export const getSeriesById = async (seriesId: number) => {
  try {
    const series = await prismaClient.series.findUnique({
      where: {
        id: seriesId,
      },
      include: {
        folder: true,
      },
    });
    return series;
  } catch (e) {
    console.log(e);
  }
};

export const createSeries = async (seriesData: any) => {
  try {
    const series = await prismaClient.series.create({
      data: seriesData,
    });
    return series;
  } catch (e) {
    console.error("Error occurred while creating series:", e);
    return null;
  }
};

export const updateSeries = async (seriesId: number, seriesData: any) => {
  try {
    const series = await prismaClient.series.update({
      where: {
        id: seriesId,
      },
      data: seriesData,
    });
    return series;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSeries = async (seriesId: number) => {
  try {
    await prismaClient.series.delete({
      where: {
        id: seriesId,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

