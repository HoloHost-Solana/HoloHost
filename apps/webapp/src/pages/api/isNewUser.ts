import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  data: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.query;

  try {
    const user = await prisma?.user.findUnique({
      where: {
        id: userId as string,
      },
    });

    if (!user) {
      return;
    }

    if (!user.userType) {
      return res.status(201).json({ message: "user new", data: true });
    } else {
      return res.status(201).json({ message: "user old", data: false });
    }
  } catch (error) {}
  res.status(200).json({ message: "Internal Server Error", data: false });
}
