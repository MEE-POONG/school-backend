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

                const indexSlder = await prisma.indexSlder.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalindexSlder = await prisma.indexSlder.count();
                const totalPage: number = Math.ceil(totalindexSlder / pageSize);
                res.status(200).json({ indexSlder });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the indexSlder" });
            }
            break;

        case 'POST':
            try {
                const newindexSlder = await prisma.indexSlder.create({
                    data: req.body,
                });

                res.status(201).json(newindexSlder);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the indexSlder" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}