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

                const sliderSchool = await prisma.sliderSchool.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalsliderSchool = await prisma.sliderSchool.count();
                const totalPage: number = Math.ceil(totalsliderSchool / pageSize);
                res.status(200).json({ sliderSchool });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the sliderSchool" });
            }
            break;

        case 'POST':
            try {
                const newsliderSchool = await prisma.sliderSchool.create({
                    data: req.body,
                });

                res.status(201).json(newsliderSchool);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the sliderSchool" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}