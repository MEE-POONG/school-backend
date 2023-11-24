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
    case "POST":
      await handlePOST(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const coursegroupInfo = await prisma.courseGroup.findMany();
    res.status(200).json(coursegroupInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coursegroup information" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newCourseGroup = await prisma.courseGroup.create({
      data: req.body
    });
    res.status(201).json(newCourseGroup);
  } catch (error) {
    res.status(500).json({ message: "Error creating coursegroup information" });
  }
}
