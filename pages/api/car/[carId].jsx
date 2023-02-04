import fs from "fs/promises";
import path from "path";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).send({
      error: "Unaothorized",
    });
  }

  if (req.method === "GET") {
    const { carId } = req.query;
    res.status(200).json({ carId });
  }

  if (req.method === "PUT") {
  }

  if (req.method === "DELETE") {
    const { carId } = req.query;
    let car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    try{
      await fs.unlink(path.join(`${process.cwd()}/public/images/${car.image}`));
    }catch(err){
      console.log('File not found');
    }

    await prisma.car.delete({
      where: {
        id: carId,
      },
    });

    res.status(200).json({
      message: "Data deleted",
    });
  }
}
