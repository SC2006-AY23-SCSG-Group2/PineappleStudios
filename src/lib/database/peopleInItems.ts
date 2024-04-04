import {prismaClient} from "./prisma";

export const createPeopleinItemsAssignments = async (request: any) => {
    try {
        const assignmentData = request.body;
        const assignment = await prismaClient.peopleInItems.create({
        data: assignmentData,
        });
        return assignment;
    } catch (error) {
          console.error("Error occurred while creating people in items:", error);
    }
};


