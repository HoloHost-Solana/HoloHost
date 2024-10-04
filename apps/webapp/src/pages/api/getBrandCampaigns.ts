// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

enum status {
  ONGOING,
  PAST,
}

interface IBody {
  id: string;
  name: string;
  daysLeft: number;
  desc: string;
  status: status;
}

type Data = {
  code: number;
  message: string;
  response: IBody[] | null;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user) {
      return res.status(500).json({
        code: 500,
        message: "unauth",
        response: null,
      });
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        ownerId: session.user.id,
      },
    });

    const camps = campaigns.map((c) => {
      return {
        id: c.id,
        name: c.name,
        desc: c.description,
        //@ts-ignore
        daysLeft: Math.ceil(Math.abs(c.EndDate - new Date()) / (1000 * 60 * 60 * 24)),
        status: c.EndDate > new Date() ? status.ONGOING : status.PAST,
      };
    });

    return res.status(200).json({
      code: 200,
      message: "campaings",
      response: camps,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "INTERNAL SERVER ERROR",
      response: null,
    });
  } finally {
    await prisma.$disconnect();
  }
}
