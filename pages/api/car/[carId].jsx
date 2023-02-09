import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import cloudinary from '../../../lib/cloudinary'
import nextConnect from "next-connect";

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(async (req, res, next) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).send({
        error: "Unaothorized",
      });
    }
    next()
  })
  .get((req, res) => {
    const { carId } = req.query;
    res.status(200).json({ carId });
  })
  .post(async (req, res) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(403).send({
        error: "Unaothorized",
      });
    }
    storeData(req, res)
  })
  .delete(async (req, res) => {
    const { carId } = req.query;
    let car = await prisma.car.findUnique({
      where: {
        id: carId,
      },
    });

    await cloudinary.uploader.destroy(carId);

    await prisma.car.delete({
      where: {
        id: carId,
      },
    });

    res.status(200).json({
      message: "Data deleted",
    });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler
