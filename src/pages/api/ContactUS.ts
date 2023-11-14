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
    const contactInfo = await prisma.contactUS.findMany();
    res.status(200).json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact information" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newContact = await prisma.contactUS.create({
      data: req.body
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: "Error creating contact information" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const updatedContact = await prisma.contactUS.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact information" });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    await prisma.contactUS.delete({
      where: { id }
    });
    res.status(200).json({ message: "Contact information deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact information" });
  }
}