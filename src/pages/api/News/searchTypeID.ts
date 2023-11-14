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
  keyword?: string;
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
        const newsTypeId: string | undefined = query.keyword;

        let paginationInfo: Pagination[] = [];
        let newsData: any[] = []; // This will hold the news items and their associated pagination information

        if (newsTypeId) {
          // If a specific newsTypeId is requested, fetch the paginated news items for that type
          const page: number = parseInt(query.page || "1", 10);
          const totalCount = await prisma.news.count({
            where: { newsTypeId: newsTypeId }
          });
          const totalPages = Math.ceil(totalCount / pageSize);

          const newsForType = await prisma.news.findMany({
            where: { newsTypeId: newsTypeId },
            skip: (page - 1) * pageSize,
            take: pageSize
          });

          paginationInfo.push({
            type: newsTypeId,
            page: page,
            pageSize: pageSize,
            totalPages: totalPages
          });

          newsData = newsForType;
        } else {
          // If no specific newsTypeId is requested, fetch all types and their first page of news items
          const uniqueNewsTypes = await prisma.news.groupBy({
            by: ["newsTypeId"],
            _count: {
              newsTypeId: true
            }
          });

          for (const type of uniqueNewsTypes) {
            if (type.newsTypeId === null) continue; // Skip if newsTypeId is null

            // Calculate total pages for the current newsTypeId
            const totalCount = type._count.newsTypeId || 0;
            const totalPages = Math.ceil(totalCount / pageSize);

            const newsForType = await prisma.news.findMany({
              where: { newsTypeId: type.newsTypeId },
              take: pageSize
            });

            // Only add the type if there are news items
            if (newsForType.length > 0) {
              newsData.push(...newsForType);
              paginationInfo.push({
                type: type.newsTypeId,
                page: 1,
                pageSize: pageSize,
                totalPages: totalPages
              });
            }
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
