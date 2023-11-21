import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

type Data = {
  success: boolean;
  message?: string;
  data?: any;
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  switch (method) {

    case "GET":
      try {
        const newsTypeData = await prisma.newsType.findMany();
        res.status(200).json({
          success: true,
          data: newsTypeData,
        });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "An unexpected error News" });
      }
      break;
    case "POST":
      try {
        const newNews = await prisma.newsType.create({
          data: req.body
        });

        res.status(200).json({ success: true, data: newNews });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "An unexpected error News" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
