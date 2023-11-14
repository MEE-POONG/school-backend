import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

interface NewRegisterForm {
  personalID: string;
  birth: string;
  prefix: string;
  sex: string;
  nation: string;
  nameTh: string;
  lastnameTh: string;
  nameEng: string;
  lastnameEng: string;
  email: string;
  phone: string;
  img: string;
  oldSchool: string;
  degree: string;
  gpa: string;
  program: string;
  faculty: string;
  major: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      // Handle GET request to fetch data
      const registerFormData = await prisma.registerForm.findMany();

      res.status(200).json({ success: true, data: registerFormData });
    } catch (error) {
      console.error("GET request error:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while fetching the data"
      });
    }
  } else if (req.method === "POST") {
    try {
      const data: NewRegisterForm = req.body;

      if (!data) {
        res
          .status(400)
          .json({ success: false, error: "Request body is missing data." });
        return;
      }

      // Insert data into the database using Prisma
      await prisma.registerForm.create({
        data: {
          personalID: data.personalID,
          birth: data.birth,
          nation: data.nation,
          prefix: data.prefix,
          sex: data.sex,
          nameTh: data.nameTh,
          lastnameTh: data.lastnameTh,
          nameEng: data.nameEng,
          lastnameEng: data.lastnameEng,
          phone: data.phone,
          email: data.email,
          img: data.img,
          oldSchool: data.oldSchool,
          degree: data.degree,
          gpa: data.gpa,
          program: data.program,
          faculty: data.faculty,
          major: data.major
        }
      });

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("POST request error:", error);
      res.status(500).json({
        success: false,
        error: "An error occurred while creating the data"
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
