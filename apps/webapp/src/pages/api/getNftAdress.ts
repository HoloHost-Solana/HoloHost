// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface I {
    mintAdress: string
}

type Data = {
  code: number,
  message: string,
  response: I | null
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {

    const { id } = req.body;

    const nft = await prisma.nFT.findFirst({
        where: {
            campaignId: id
        }
    })

    if (!nft) {
        return res.status(404).json({
            code: 404,
            message: 'nft not found',
            response: null
        })
    }

    return res.status(200).json({
        code: 200,
        message: 'nft address',
        response: {
            mintAdress: nft.mintAddress
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
