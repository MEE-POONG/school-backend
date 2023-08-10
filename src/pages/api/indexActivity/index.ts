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

                const indexActivity = await prisma.indexActivity.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalindexActivity = await prisma.indexActivity.count();
                const totalPage: number = Math.ceil(totalindexActivity / pageSize);
                res.status(200).json({ indexActivity });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the indexActivity" });
            }
            break;

        case 'POST':
            try {
                const newindexActivity = await prisma.indexActivity.create({
                    data: req.body,
                });

                res.status(201).json(newindexActivity);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the indexActivity" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}