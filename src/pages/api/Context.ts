
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

        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

async function handleGET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const courseGroups = await prisma.courseGroup.findMany();
        const courseList = await prisma.courseList.findMany();
        const about = await prisma.about.findFirst();
        const ipAddresses = await prisma.iPAddress.findMany();
        const contact = await prisma.contactUS.findFirst();

        res.status(200).json({
            courseGroupsCount: courseGroups.length,
            courseListCount: courseList.length,
            studyingCount: about?.StudyingCount || 0,
            ipAddressesCount: ipAddresses.length,
            contactData: contact,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Context" });
    }
}
