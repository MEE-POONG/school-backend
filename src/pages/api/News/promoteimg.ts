import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
type Data = {
  success: boolean;
  message?: string;
  data?: any;
  pagination?: Pagination;
};

type Pagination = {
  page: number;
  pageSize: number;
  total: number;
};
interface RequestQuery {
  page?: string;
  pageSize?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const query: RequestQuery = req.query as unknown as RequestQuery;
      const page: number = parseInt(query.page || "1", 10);
      const pageSize: number = parseInt(query.pageSize || "10", 10);
      const newsData = await prisma.news.findMany({
        where: {
          promoteImg: {
            not: null
          }
        },
        skip: (page - 1) * pageSize,
        take: pageSize
      });

      const totalNewsCount: number = await prisma.news.count();
      const totalPages: number = Math.ceil(totalNewsCount / pageSize);
      res.status(200).json({
        success: true,
        newsData,
        pagination: { total: totalPages, page: page, pageSize: pageSize }
      });
      break;
    case "POST":
      try {
        const newNews = await prisma.news.create({
          data: req.body
        });

        res.status(201).json(newNews);
      } catch (error) {
        res
          .status(500)
          .json({ error: "An error occurred while creating the newsSchool" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
