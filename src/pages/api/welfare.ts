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
    const welfareEntries = await prisma.welfare.findMany();
    res.status(200).json(welfareEntries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching welfare entries" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newWelfare = await prisma.welfare.create({
      data: req.body
    });
    res.status(201).json(newWelfare);
  } catch (error) {
    res.status(500).json({ message: "Error creating welfare entry" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const updatedWelfare = await prisma.welfare.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updatedWelfare);
  } catch (error) {
    res.status(500).json({ message: "Error updating welfare entry" });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    await prisma.welfare.delete({
      where: { id }
    });
    res.status(200).json({ message: "Welfare entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting welfare entry" });
  }
}
