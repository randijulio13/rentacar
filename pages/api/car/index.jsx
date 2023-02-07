import formidable from "formidable";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prismadb";
import path from "path";
import fs from "fs/promises";
import qs from "querystring";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (req, saveLocally = false) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, part, form) => {
      return `${Date.now().toString()}${path.extname(part.originalFilename)}`;
    };
    options.keepExtensions = true;
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const generateLink = (limit, page) => {
  let query = {};
  query.limit = limit;
  query.page = page;
  return `${process.env.BASE_URL}/api/car?${qs.stringify(query)}`;
};

const getTotalData = async () => {
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

const getPagination = async (limit, page, totalData) => {
  limit = parseInt(limit);
  page = parseInt(page);
  let links = [];
  let totalPage = getTotalPage(limit, totalData);
  let prevPageUrl = page <= 1 ? null : generateLink(limit, page - 1);
  let nextPageUrl = page >= totalPage ? null : generateLink(limit, page + 1);
  let firstPageUrl = generateLink(limit, 1);
  let lastPageUrl = generateLink(limit, totalPage);

  links.push({
    url: prevPageUrl,
    label: "Previous Page",
    active: false,
  });
  for (let i = 1; i <= totalPage; i++) {
    links.push({
      url: generateLink(limit, i),
      label: i,
      active: i == page,
    });
  }
  links.push({
    url: nextPageUrl,
    label: "Next Page",
    active: false,
  });

  return {
    currentPage: page,
    totalData,
    totalPage,
    perPage: limit,
    nextPageUrl,
    prevPageUrl,
    firstPageUrl,
    lastPageUrl,
    links,
  };
};

async function getData(req, res) {
  let { page, limit } = req.query;
  let filter = {};
  let totalData = await getTotalData();
  let pagination = {};

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
    pagination = await getPagination(limit, page, totalData);
  }

  let car = await prisma.car.findMany(filter);
  let data = { message: "OK", data: car, totalData };
  if (page) {
    data.totalPage = pagination.totalPage;
  }
  return res.status(200).json(data);
}

async function storeData(req, res) {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/images"));
  } catch (err) {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"));
  }

  let {
    fields: { name, description },
    files,
  } = await readFile(req, true);

  await prisma.car.create({
    data: {
      name,
      description,
      image: files.image.newFilename,
    },
  });

  return res.status(200).json({ message: "Data added successfully" });
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return await getData(req, res);
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).send({
      error: "Unaothorized",
    });
  }

  if (req.method === "POST") {
    return await storeData(req, res);
  }
}
