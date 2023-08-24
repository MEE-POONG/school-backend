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

                const registerForm = await prisma.registerForm.findMany({
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                });

                const totalregisterForm = await prisma.registerForm.count();
                const totalPage: number = Math.ceil(totalregisterForm / pageSize);
                res.status(200).json({ registerForm });
            } catch (error) {
                res.status(500).json({ error: "An error occurred while fetching the registerForm" });
            }
            break;

        case 'POST':
            try {
                const newregisterForm = await prisma.registerForm.create({
                    data: req.body,
                });

                res.status(201).json(newregisterForm);
            } catch (error) {
                res.status(500).json({ error: "An error occurred while creating the registerForm" });
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}