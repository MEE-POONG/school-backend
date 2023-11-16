import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

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
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

// const { title, subTitle, pageCheck, pathBtn, btnTitle, detail, imgOne, imgTwo, imgThree } = req.body;
// try {
//   const updatedHeadPage = await prisma.headPage.update({
//     where: { id: String(id) },
//     data: {
//       title,
//       subTitle,
//       pageCheck,
//       pathBtn,
//       btnTitle,
//       detail,
//       imgOne,
//       imgTwo,
//       imgThree,
//     },
//   });

//   res.status(200).json({ success: true, data: updatedHeadPage });
// } catch (error) {
//   res.status(500).json({ success: false, message: 'An error occurred while updating the HeadPage' });
// }

async function handlePUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const id = req.query.id as string;
    const { title, subTitle, pageCheck, pathBtn, btnTitle, detail, imgOne, imgTwo, imgThree } = req.body;
    const updatedHeadPage = await prisma.headPage.update({
      where: { id: String(id) },
      data: {
        title,
        subTitle,
        pageCheck,
        pathBtn,
        btnTitle,
        detail,
        imgOne,
        imgTwo,
        imgThree,
      },
    });
    res.status(200).json({ success: true, data: updatedHeadPage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while updating the HeadPage' });
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
