import { prismaClient } from "../database/prisma";
import { createSeries } from "../database/series";

const prisma = prismaClient;

export async function updateSeriesToFolder(folderId: number, seriesId: number) {
  try {
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

    // Fetch the series to ensure it exists
    const series = await prisma.series.findUnique({
      where: {
        id: seriesId,
      },
    });

    if (!series) {
      console.log(`Series with ID ${seriesId} does not exist.`);
      return false;
    }

    // Add the series to the folder
    await prisma.series.update({
      where: {
        id: seriesId,
      },
      data: {
        folder: {
          connect: {
            id: folderId,
          },
        },
      },
    });

    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error adding series to folder:", error);
    return false;
  }
}

export const createSeriesInFolder = async (seriesName: string, folderId: number) => {
  try {
    // Check if the folder exists
    const existingFolder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
    });

    if (!existingFolder) {
      console.log(`Folder with ID ${folderId} does not exist.`);
      return null;
    }

    // Check if a series with the same name already exists in the folder
    const existingSeriesInFolder = await prisma.series.findFirst({
      where: {
        name: seriesName,
        folderId: folderId,
      },
    });

    if (existingSeriesInFolder) {
      console.log(`Series with name '${seriesName}' already exists in the folder.`);
      return null;
    }

    // Create the series with the unique name and associate it with the folder
    const seriesData = {
      name: seriesName,
      folder: {
        connect: {
          id: folderId,
        },
      },
    };
    const series = await createSeries(seriesData);

    console.log(`Series '${seriesName}' created successfully in the folder.`);
    return series;
  } catch (error) {
    console.error("Error occurred while creating series:", error);
    return null;
  }
};

export const deleteSeriesFromFolder = async (seriesId: number, folderId: number) => {
  try {
    // Check if the series exists in the specified folder
    const existingSeries = await prismaClient.series.findFirst({
      where: {
        id: seriesId,
        folderId: folderId,
      },
    });

    if (!existingSeries) {
      console.log(`Series with ID ${seriesId} does not exist in folder with ID ${folderId}.`);
      return false;
    }

    // Delete the series from the folder
    await prismaClient.series.delete({
      where: {
        id: seriesId,
      },
    });

    console.log(`Series with ID ${seriesId} deleted successfully from folder with ID ${folderId}.`);
    return true;
  } catch (error) {
    console.error("Error occurred while deleting series from folder:", error);
    return false;
  }
};

  
  
//   export async function removeSeriesFromFolder(folderId: number, seriesId: number) {
//     try {
//         // Check if the series exists and if it is associated with the specified folder
//         const series = await prisma.series.findFirst({
//             where: {
//                 id: seriesId,
//                 folderId: folderId,
//             },
//         });

//         if (!series) {
//             console.log(`Series with ID ${seriesId} is not associated with the folder with ID ${folderId}.`);
//             return false;
//         }

//         // Log the series data before update
//         console.log("Series before update:", series);

//         // Remove the series from the folder by updating the folderId to null
//         const updatedSeries = await prisma.series.update({
//             where: {
//                 id: seriesId,
//             },
//             data: {
//                 folderId: null,
//             },
//         });

//         // Log the updated series data
//         console.log("Updated series:", updatedSeries);

//         return true; // Return true to indicate success
//     } catch (error) {
//         console.error("Error removing series from folder:", error);
//         return false;
//     }
// }




