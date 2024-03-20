import { prisma } from "@/lib/prisma";

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
