import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGET(req, res);
      break;
    case "PUT":
      await handlePUT(req, res);
      break;
    case "DELETE":
      await handleDELETE(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      res.status(400).json({ message: "Invalid or missing ID" });
      return;
    }
    const newsInfo = await prisma.news.findUnique({
      where: {
        id: id,
      },
    });
    if (!newsInfo) {
      res.status(404).json({ message: "News item not found" });
      return;
    }
    res.status(200).json(newsInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching news information" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const { title, subTitle, detail, img, promoteImg, startDate, endDate, } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title,
        subTitle,
        detail,
        img,
        promoteImg,
        startDate,
        endDate,
      },
    });
    res.status(200).json({ success: true, data: updatedNews });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the News', error: error.message });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    await prisma.news.delete({
      where: { id }
    });
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error deleting News" });
  }
}
