import { News, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface Pagination {
  type?: string;
  page?: number;
  pageSize?: number;
  totalPages?: number;
}
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
      try {
        const query: RequestQuery = req.query as unknown as RequestQuery;
        const pageSize: number = parseInt(query.pageSize || "10", 10);

        const uniqueNewsTypes = await prisma.news.groupBy({
          by: ["newsTypeId"],
          _count: {
            newsTypeId: true
          }
        });
        let newsData: News[] = [];
        let paginationInfo: Pagination[] = []; // Use camelCase for variable names
        for (const type of uniqueNewsTypes) {
          if (type.newsTypeId === null) continue; // Skip if newsTypeId is null

          // Calculate total pages for the current newsTypeId
          const totalCount = type._count.newsTypeId || 0;
          const totalPages = Math.ceil(totalCount / pageSize);

          const newsForType = await prisma.news.findMany({
            where: { newsTypeId: type.newsTypeId },
            take: pageSize // Use the page size, or a minimum value if necessary
          });

          // Only add the type if there are news items
          if (newsForType.length > 0) {
            newsData = [...newsData, ...newsForType];
            paginationInfo.push({
              // Add a new Pagination object to the array
              page: 1,
              pageSize: pageSize,
              totalPages: totalPages,
              type: type.newsTypeId
            });
          }
        }

        res.status(200).json({
          success: true,
          data: newsData,
          paginationInfo
        });
      } catch (error) {
        console.error("Error:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
