import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;

    switch (method) {
        case "GET":
            await handleGET(req, res);
            break;
        case "POST":
            await handlePOST(req, res);
            break;
        case "PUT":
            await handlePUT(req, res);
            break;
        case "DELETE":
            await handleDELETE(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const headPages = await prisma.headPage.findMany();
        res.status(200).json(headPages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching HeadPages" });
    }
}

async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newHeadPage = await prisma.headPage.create({
            data: req.body
        });
        res.status(201).json(newHeadPage);
    } catch (error) {
        res.status(500).json({ message: "Error creating HeadPage" });
    }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = req.query.id as string;
        const updatedHeadPage = await prisma.headPage.update({
            where: { id },
            data: req.body
        });
        res.status(200).json(updatedHeadPage);
    } catch (error) {
        res.status(500).json({ message: "Error updating HeadPage" });
    }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
    try {
        const id = req.query.id as string;
        await prisma.headPage.delete({
            where: { id }
        });
        res.status(200).json({ message: "HeadPage deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting HeadPage" });
    }
}
