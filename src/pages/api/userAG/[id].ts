import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const { id } = req.query; // assuming id is passed as a query param

    switch (method) {
        case 'GET':
            try {
                const userAG = await prisma.userAG.findUnique({
                    where: { id: String(id) },
                });
                res.status(200).json(userAG);
            } catch (error) {
                
                res.status(500).json({ error: "An error occurred while fetching the userAG" });
            }
            break;
        case 'PUT':
            const { username, originAG, percent, commission, overdue, adjustPercentage, pay, customerCommission, recommender } = req.body;
            try {
                const updatedPartner = await prisma.userAG.update({
                    where: { id: String(id) },
                    data: {
                        username,
                        originAG,
                        percent,
                        commission,
                        overdue,
                        adjustPercentage,
                        pay,
                        customerCommission,
                        recommender
                    },
                });
                res.status(200).json(updatedPartner);
            } catch (error) {
                
                res.status(500).json({ error: "An error occurred while updating the userAG" });
            }
            break;
        case 'DELETE':
            try {
                const deletedPartner = await prisma.userAG.delete({
                    where: { id: String(id) },
                });
                res.status(200).json(deletedPartner);
            } catch (error) {
                
                res.status(500).json({ error: "An error occurred while deleting the userAG" });
            }
            break;
        default:
            res.setHeader('Allow', ['GET','PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
