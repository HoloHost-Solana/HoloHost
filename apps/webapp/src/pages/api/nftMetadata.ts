import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  message?: string;
  data?: any;
  name?: string;
  description?: string;
  imageUrl?: string;
  symbol?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed", data: null });
  }

  try {
    const { nftId } = req.query;

    const data = await prisma.nFT.findUnique({
      where: {
        id: nftId as string,
      },
    });

    if (!data) {
      return res.status(501).json({ message: "DB error", data: null });
    }

    const { name, symbol, imageUrl, description } = data;

    return res.status(200).json({ name, symbol, imageUrl, description });
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Internal Server Error", data: null });
  }
}
