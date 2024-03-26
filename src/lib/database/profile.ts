import {prismaClient} from "./prisma";

  // get profile by id
  export const getProfileById = async (request: any) => {
    try {
      const profileId = request.params.id;
      const profile = await prismaClient.profile.findUnique({
        where: {
          id: profileId,
        },
        include: {
          user: true, //also fetch "User" 
        },
      });
      return profile;
    } catch (e) {
      console.log(e);
    }
  };
  
  // create profile
  export const createProfile = async (request: any) => {
    try {
      const profileData = request.body;
      const profile = await prismaClient.profile.create({
        data: profileData,
      });
      return profile;
    } catch (e) {
      console.log(e);
    }
  };
  
  // update  profile
  export const updateProfile = async (request: any) => {
    try {
      const profileId = request.params.id;
      const profileData = request.body;
      // Remove bookId from bookData to prevent updating it
      delete profileData.id;
  
      const profile = await prismaClient.profile.update({
        where: {
          id: profileId,
        },
        data: profileData,
      });
      return profile;
    } catch (e) {
      console.log(e);
    }
  };
  
  // delete profile
  export const deleteProfile = async (request: any) => {
    try {
      const profileId = request.params.id;
      const profile = await prismaClient.book.delete({
        where: {
          id: profileId,
        },
      });
      return {success : true}
    } catch (e) {
      console.log(e);
    }
  };


