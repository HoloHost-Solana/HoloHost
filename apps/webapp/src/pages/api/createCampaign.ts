import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

import { PrismaClient } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    console.log("ssdifdgkfjglkflkgfg", session);

    if (!session || !session?.user) {
      return res.status(500).json({
        code: 500,
        message: "Unauthorized",
        response: null,
      }) 
    }

    const { name, description, startDate, endDate } = req.body;
    console.log(name, description);

    const create = await prisma.campaign.create({
      data: {
        description,
        name,
        totalNFTs: 0,
        startDate,
        EndDate: endDate,
        ownerId: session?.user.id,
      },
    });

    console.log(create);

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
