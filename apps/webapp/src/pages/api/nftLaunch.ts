import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // if (req.method !== "POST") {
  //   return res.status(405).json({ message: "Method Not Allowed", data: null });
  // }
  const { name, description, campaignId, symbol, imageUrl, mintAddress } =
    JSON.parse(req.body as string);

    console.log('first', description, campaignId);

  const metadata = JSON.stringify({
    name,
    description,
    symbol,
    imageUrl,
    mintAddress,
  });

  console.log(metadata);

  try {
    const newNft = await prisma.nFT.create({
      data: {
        name,
        description,
        campaignId,
        symbol,
        imageUrl,
        mintAddress,
        metadata,
      },
    });

    if (!newNft) {
      return res.status(501).json({ message: "DB error", data: null });
    }

    return res
      .status(200)
      .json({ message: "NFT created successfully", data: newNft });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Internal Server Error", data: null });
  }
}
