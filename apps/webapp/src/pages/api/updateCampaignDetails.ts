import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

type Data = {
  code: number,
  message: string,
  response: null
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
    try {

        const session = await getServerSession(req, res, authOptions);

        if (!session || !session.user || !session.user.id) {
            return res.status(500).json({
                code: 500,
                message: 'unauth',
                response: null
            })
        }

        const { title, desc, id } = req.body;

        if (typeof session.user.id !== "string") return;

        await prisma.campaign.update({
            where: {
                id
            },
            data: {
                name: title,
                description: desc
            }
        })

        res.status(200).json({
            code: 200,
            message: 'updated details',
            response: null
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            message: 'INTERNAL_SERVER_ERROR',
            response: null
        })
    } finally {
        await prisma.$disconnect();
    }
}
