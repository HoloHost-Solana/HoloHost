import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function onboarding(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, userType, desc, userId } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        userType,
        description: desc,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error during onboarding:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
