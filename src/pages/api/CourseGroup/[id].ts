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
    const coursegroupInfo = await prisma.courseGroup.findUnique({
      where: {
        id: id,
      },
    });
    if (!coursegroupInfo) {
      res.status(404).json({ message: "CourseGroup item not found" });
      return;
    }
    res.status(200).json(coursegroupInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coursegroup information" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const { nameTH, nameEN, img, } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    const updatedCourseGroup = await prisma.courseGroup.update({
      where: { id },
      data: {
        nameTH,
        nameEN,
        img,
      },
    });
    res.status(200).json(updatedCourseGroup);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the CourseGroup', error: error.message });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    await prisma.courseGroup.delete({
      where: { id }
    });
    res.status(200).json({ message: "CourseGroup deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error deleting CourseGroup" });
  }
}
