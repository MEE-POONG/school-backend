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
    const courseLists = await prisma.courseList.findMany();
    res.status(200).json(courseLists);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course lists" });
  }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newCourseList = await prisma.courseList.create({
      data: req.body
    });
    res.status(201).json(newCourseList);
  } catch (error) {
    res.status(500).json({ message: "Error creating course list" });
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const updatedCourseList = await prisma.courseList.update({
      where: { id },
      data: req.body
    });
    res.status(200).json(updatedCourseList);
  } catch (error) {
    res.status(500).json({ message: "Error updating course list" });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    await prisma.courseList.delete({
      where: { id }
    });
    res.status(200).json({ message: "Course list deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course list" });
  }
}
