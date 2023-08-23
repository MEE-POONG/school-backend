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

                const activitySchool = await prisma.activitySchool.findMany({
                    // skip: (page - 1) * pageSize,
                    // take: pageSize,
                });

                const totalactivitySchool = await prisma.activitySchool.count();
                const totalPage: number = Math.ceil(totalactivitySchool / pageSize);
                res.status(200).json({ activitySchool });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the activitySchool" });
            }
            break;

        case 'POST':
            try {
                const newactivitySchool = await prisma.activitySchool.create({
                    data: req.body,
                });

                res.status(201).json(newactivitySchool);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the activitySchool" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}