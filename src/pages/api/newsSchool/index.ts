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

                const newsSchool = await prisma.newsSchool.findMany({
                    // skip: (page - 1) * pageSize,
                    // take: pageSize,
                });

                const totalnewsSchool = await prisma.newsSchool.count();
                const totalPage: number = Math.ceil(totalnewsSchool / pageSize);
                res.status(200).json({ newsSchool });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the newsSchool" });
            }
            break;

        case 'POST':
            try {
                const newnewsSchool = await prisma.newsSchool.create({
                    data: req.body,
                });

                res.status(201).json(newnewsSchool);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the newsSchool" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}