import { Prisma, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface QueryParams {
  page?: string;
  pageSize?: string;
  search?: string;
  type?: string;
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
    const { page = '1', pageSize = '10', search } = req.query as QueryParams;

    const pageNum = parseInt(page, 10) || 1;
    const pageSizeNum = parseInt(pageSize, 10) || 10;

    const skip = (pageNum - 1) * pageSizeNum;
    const take = pageSizeNum;

    const searchCondition = search ? {
      nameTH: { contains: search, mode: 'insensitive' as Prisma.QueryMode },
      // Add other conditions if needed
    } : {};

    const andConditions: Prisma.CourseGroupWhereInput[] = [];

    if (search && search.length >= 3) {
      andConditions.push({ nameTH: { contains: search, mode: 'insensitive' as Prisma.QueryMode } });

    }

    const whereClause: Prisma.CourseGroupWhereInput = {
      AND: andConditions
    };

    const courseGroupItems = await prisma.courseGroup.findMany({
      where: whereClause,
      skip,
      take,
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
    res.status(500).json({ message: "Error fetching course list information" });
  }
}
