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

                const headPageData = await prisma.headPage.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalhompage = await prisma.headPage.count();
                const totalPage: number = Math.ceil(totalhompage / pageSize);
                res.status(200).json({ headPageData });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the registerForm" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}