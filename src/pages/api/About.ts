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
    case "PUT":
      await handlePUT(req, res);
      break;
    case "DELETE":
      await handleDELETE(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const aboutInfo = await prisma.about.findFirst();
    res.status(200).json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about information" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newAbout = await prisma.about.create({
      data: req.body
    });
    res.status(201).json(newAbout);
  } catch (error) {
    res.status(500).json({ message: "Error creating about information" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const updatedAbout = await prisma.about.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Error updating about information" });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    await prisma.about.delete({
      where: { id }
    });
    res.status(200).json({ message: "About information deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting about information" });
  }
}