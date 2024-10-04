import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const session = await getSession();

    if (!session || !session?.user) {
      return {
        code: 500,
        message: "Unauthorized",
        response: null,
      };
    }

    const { name, description, startDate, endDate } = req.body;

    const create = await prisma.campaign.create({
      data: {
        description,
        name,
        totalNFTs: 0,
        startDate,
        EndDate: endDate,
        ownerId: session.user.id,
      },
    });

    return {
      code: 200,
      message: "Created campaign",
      response: create,
    };
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
