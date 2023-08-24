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

                const adminUser = await prisma.adminUser.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totaladminUser = await prisma.adminUser.count();
                const totalPage: number = Math.ceil(totaladminUser / pageSize);
                res.status(200).json({ adminUser });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the adminUser" });
            }
            break;

        case 'POST':
            try {
                const newadminUser = await prisma.adminUser.create({
                    data: req.body,
                });

                res.status(201).json(newadminUser);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the adminUser" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}