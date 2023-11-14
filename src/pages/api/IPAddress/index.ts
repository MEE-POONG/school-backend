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
    const ipAddresses = await prisma.iPAddress.findMany();
    res.status(200).json(ipAddresses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching IP addresses" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newIPAddress = await prisma.iPAddress.create({
      data: req.body
    });
    res.status(201).json(newIPAddress);
  } catch (error) {
    res.status(500).json({ message: "Error creating IP address" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const updatedIPAddress = await prisma.iPAddress.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updatedIPAddress);
  } catch (error) {
    res.status(500).json({ message: "Error updating IP address" });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    await prisma.iPAddress.delete({
      where: { id }
    });
    res.status(200).json({ message: "IP address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting IP address" });
  }
}