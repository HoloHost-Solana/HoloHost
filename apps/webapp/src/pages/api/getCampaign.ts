// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type IResponse = {
    title: string,
    desc: string
}

type Data = {
  code: number,
  message: string,
  response: IResponse | null
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {

    const { id } = req.body;
    const camp = await prisma.campaign.findFirst({
        where: {
            id
        }
    })

    if (!camp) {
        return res.status(404).json({
            code: 404,
            message: 'not found',
            response: null
        })
    }

    return res.status(200).json({
        code: 200,
        message: 'found',
        response: {
            title: camp.name,
            desc: camp.description
        }
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      code: 500,
      message: "INTERNAL_SERVER_ERROR",
      response: null,
    });
  } finally {
    await prisma.$disconnect();
  }
}
