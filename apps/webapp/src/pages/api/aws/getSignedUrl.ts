import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

// Initialize S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function putObject(filename: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME as string,
    Key: `${filename}`,
    ContentType: contentType,
  });

  const putObjectUrl = await getSignedUrl(s3Client, command);
  return putObjectUrl;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { filename, contentType } = req.query;

    if (!filename || !contentType) {
      return res
        .status(400)
        .json({ message: "Missing filename or contentType" });
    }

    try {
      const url = await putObject(filename as string, contentType as string);

      return res.status(201).json({
        message: "URL generated",
        url: url,
      });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      return res.status(500).json({ message: "Error generating signed URL" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
