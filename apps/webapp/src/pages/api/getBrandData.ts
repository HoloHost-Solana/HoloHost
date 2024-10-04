// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
    try {

        const session = await getServerSession(req, res, authOptions);
        
        if (!session || !session.user) {
            return res.status(500).json({
                code: 500,
                message: 'unauth',
                response: null
            })
        }

        const brand = await prisma.user.findFirst({ where: { id: session.user.id } });

        if (!brand) {
            return res.status(404).json({
                code: 404,
                message: 'brand detials not found',
                response: null
            })
        }

        return res.status(200).json({
            code: 200,
            message: 'details',
            response: {
                name: session.user.name,
                image: session.user.image,
                desc: brand.description
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            code: 500,
            message: 'INTERNAL SERVER ERROR',
            response: null
        })
    } finally {
        await prisma.$disconnect();
    }

}
