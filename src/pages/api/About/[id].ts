import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    // case "GET":
    //   await handleGET(req, res);
    //   break;
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

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const { title, subTitle, StudyingCount, detail, detailTo, img, logo, personChart } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    const updatedAbout = await prisma.about.update({
      where: { id },
      data: {
        title,
        subTitle,
        StudyingCount,
        detail,
        detailTo,
        img,
        logo,
        personChart,
      },
    });
    res.status(200).json({ success: true, data: updatedAbout });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the About', error: error.message });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    await prisma.about.delete({
      where: { id }
    });
    res.status(200).json({ message: "About deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error deleting About" });
  }
}
