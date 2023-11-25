import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryParams {
  page?: string;
  pageSize?: string;
  id?: string; // Changed from 'search' to 'id'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "GET":
      await handleGET(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { page = '1', pageSize = '10', id } = req.query as QueryParams;

    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 10;

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    let whereClause: Prisma.CourseGroupWhereInput = {};

    if (id) {
      whereClause = { id }; // Filter by ID
    }

    const courseGroupItems = await prisma.courseGroup.findFirst({
      where: whereClause,
      skip,
      take,
      include: {
        CourseList: true, // Include related CourseList
      },
    });

    const totalCourseGroupCount = await prisma.courseGroup.count({ where: whereClause });
    const totalPages = Math.ceil(totalCourseGroupCount / pageSizeNum);

    res.status(200).json({
      success: true,
      data: courseGroupItems,
      pagination: {
        total: totalCourseGroupCount,
        totalPages,
        page: pageNum,
        pageSize: pageSizeNum
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course group information" });
  }
}
