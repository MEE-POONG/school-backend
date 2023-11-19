import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    // case "GET":
    //   await handleGET(req, res);
    //   break;
    case "PUT":
      await handlePUT(req, res);
      break;
    case "DELETE":
      await handleDELETE(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const { addressOne, addressTwo, addressThree, subDistrict, district, province, zipcode, tel, fax, email, facebook } = req.body;

    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    const updatedContact = await prisma.contactUS.update({
      where: { id },
      data: {
        addressOne,
        addressTwo,
        addressThree,
        subDistrict,
        district,
        province,
        zipcode,
        tel,
        fax,
        email,
        facebook,
      },
    });
    res.status(200).json({ success: true, data: updatedContact });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while updating the Contact', error: error.message });
  }
}

async function handleDELETE(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    if (!id) {
      res.status(400).json({ success: false, message: 'Invalid or missing ID' });
      return;
    }

    await prisma.contactUS.delete({
      where: { id }
    });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error deleting Contact" });
  }
}
