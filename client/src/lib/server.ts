import { prisma } from "./prisma.ts";

export const addOrganization = async (organization: {
  name: string;
  avatar: string;
}) => {
  return await prisma.organization.create({
    data: {
      name: organization.name,
      avatar: organization.avatar,
    },
  });
};
