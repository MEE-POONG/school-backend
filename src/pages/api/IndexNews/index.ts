import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const page: number = Number(req.query.page) || 1;
                const pageSize: number = Number(req.query.pageSize) || 10;

                const indexNews = await prisma.indexNews.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalindexNews = await prisma.indexNews.count();
                const totalPage: number = Math.ceil(totalindexNews / pageSize);
                res.status(200).json({ indexNews });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the indexNews" });
            }
            break;

        case 'POST':
            try {
                const newindexNews = await prisma.indexNews.create({
                    data: req.body,
                });

                res.status(201).json(newindexNews);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the indexNews" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}