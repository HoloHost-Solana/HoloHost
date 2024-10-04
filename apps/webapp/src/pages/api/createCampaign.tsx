import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    try {

        const { name, startDate } = req.body;

    } catch (error) {
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}
