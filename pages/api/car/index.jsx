import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import DataURIParser from "datauri/parser";
import nextConnect from "next-connect";
import cloudinary from '../../../lib/cloudinary'
import prisma from "../../../lib/prismadb";
import multer from "multer";
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nextConnect({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(multer().any())
  .get((req, res) => {
    getData(req, res)
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
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

async function getTotalData() {
  let { _all } = await prisma.car.count({
    select: {
      _all: true,
    },
  });

  return _all;
};

const getTotalPage = (limit, totalData) => {
  let totalPage = totalData / limit;
  if (totalData % limit != 0) {
    totalPage = parseInt(totalPage) + 1;
  }
  return totalPage;
};

async function getData(req, res) {
  let { page, limit } = req.query;
  let filter = {};
  let totalData = await getTotalData();

  if (limit) {
    filter.take = parseInt(limit);
    page = page ? parseInt(page) : 1;
  }

  if (page) {
    if (!limit) {
      limit = 10;
      filter.take = parseInt(limit);
    }
    page = parseInt(page);
    filter.skip = (page - 1) * parseInt(limit);
  }

  let car = await prisma.car.findMany(filter);
  let data = { message: "OK", data: car, totalData };
  if (page) {
    data.totalPage = getTotalPage(limit, totalData);
  }
  return res.status(200).json(data);
}

async function uploadImage(req, id) {
  const parser = new DataURIParser();
  const image = req.files.filter((file) => file.fieldname === 'image')[0];
  const base64Image = parser.format(path.extname(image.originalname).toString(), image.buffer);
  const cloudinaryRes = await cloudinary.uploader.upload(base64Image.content, { public_id: id });
  const imageUrl = cloudinaryRes.secure_url;
  return imageUrl;
}

async function storeData(req, res) {
  const { name, description, color, price } = req.body
  let { id } = await prisma.car.create({
    data: {
      name,
      description,
      color,
      price:parseInt(price)
    },
  });

  let imageUrl = await uploadImage(req, id)
  await prisma.car.update({ where: { id }, data: { image: imageUrl } })
  return res.status(200).json({ message: "Data added successfully" });
}

export default handler;