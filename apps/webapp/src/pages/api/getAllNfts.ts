import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;

    const nfts = await prisma.nFT.findMany({ where: { campaignId: id } });

    const a = nfts.map(nft => {
        return {
            title: nft.name,
            description: nft.description,
            image: nft.imageUrl
        }
    })

    return res.status(200).json({
      code: 200,
      message: "nfts",
      response: a,
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
