import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryParams {
  page?: string;
  pageSize?: string;
  search?: string;
  group?: string;
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
    const { page = '1', pageSize = '20', search, group } = req.query as QueryParams;

    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 20;

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    const andConditions: Prisma.CourseListWhereInput[] = [];

    if (search && search.length >= 3) {
      andConditions.push({ FieldStudy: { contains: search, mode: 'insensitive' } });
    }

    if (group) {
      andConditions.push({ courseGroupId: group });
    }

    const whereClause: Prisma.CourseListWhereInput = {
      AND: andConditions
    };

    const courseListItems = await prisma.courseList.findMany({
      where: whereClause,
      skip,
      take,
      include: {
        CourseGroup: true // Include CourseGroup data if needed
      }
    });

    const totalCourseListCount = await prisma.courseList.count({ where: whereClause });
    const totalPages = Math.ceil(totalCourseListCount / pageSizeNum);

    res.status(200).json({
      success: true,
      data: courseListItems,
      pagination: {
        total: totalCourseListCount,
        totalPages,
        page: pageNum,
        pageSize: pageSizeNum
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching course list information" });
  }
}
