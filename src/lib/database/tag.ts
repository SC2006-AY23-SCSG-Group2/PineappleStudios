import {prismaClient} from "./prisma";

//CRUD

//get all tags
export const getAllTags = async () => {
  try {
    const allTags = await prismaClient.tag.findMany();
    return allTags;
  } catch (e) {
    console.log(e);
  }
};

//get tag by Id
export const getTagById = async (request: any) => {
  try {
    const tagId = request.params.id;
    const tag = await prismaClient.tag.findUnique({
      where: {
        id: tagId,
      },
    });
    return tag;
  } catch (e) {
    console.log(e);
  }
};

//create tag
export const createMovie = async (request: any) => {
  try {
    const tagData = request.body;
    const tag = await prismaClient.tag.create({
      data: tagData,
    });
    return tag;
  } catch (error) {
    console.error("Error occurred while creating movie:", error);
  }
};

//update tag
export const updateTag = async (request: any) => {
  try {
    const tagId = request.params.id;
    const tagData = request.body;

    delete tagData.id;

    const tag = await prismaClient.tag.update({
      where: {
        id: tagId,
      },
      data: tagData,
    });
    return tag;
  } catch (e) {
    console.log(e);
  }
};

//delete tag
export const deleteMovie = async (request: any) => {
  try {
    const tagId = request.params.id; 

    await prismaClient.tag.delete({
      where: {
        id: tagId,
      },
    });
    return {success: true};
  } catch (e) {
    console.log(e);
    return {success: false};
  }
};
