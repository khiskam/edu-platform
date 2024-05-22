import { RequestHandler, Router } from "express";
import { AdminHandler, Handler } from "./interfaces";
import multer from "multer";
import { randomUUID } from "crypto";
import { ClientError } from "@services/error";
import { ImageService } from "@services/image";
import { ImageRepository } from "@repository/image";
import { prisma } from "@app/config/db";
import { cwd } from "process";
import { ImageKeys } from "@domain/image";

// import { ClientError } from "@services/error";

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (_req, _, cb) {
    cb(null, randomUUID());
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 3 },

  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];

function checkFileType(file: Express.Multer.File, cb: multer.FileFilterCallback) {
  file.originalname = Buffer.from(file.originalname, "latin1").toString("utf8");

  for (let i = 0; i < whitelist.length; ++i) {
    if (whitelist[i] === file.mimetype) {
      if (file.size > 1024 * 1024 * 3) {
        return cb(new ClientError<ImageKeys>("Файл не должен весить больше 3Мб", "size"));
      }

      return cb(null, true);
    }
  }

  return cb(new ClientError<ImageKeys>("Файл должен быть формата изображения", "contentType"));
}

export class ImageHandler implements Handler, AdminHandler {
  private readonly _path = "/images";
  private _service: ImageService;

  constructor() {
    const repo = new ImageRepository(prisma);
    this._service = new ImageService(repo);
  }

  public initRoutes = (): Router => {
    const router = Router();

    router.get("/:id", this.getOne);

    return router;
  };

  public initAdminRoutes = (): Router => {
    const router = Router();

    router.post("/", upload.single("file"), this.create);
    return router;
  };

  get path() {
    return this._path;
  }

  private getOne: RequestHandler = async (req, res, next) => {
    const { id: imageId } = req.params;

    try {
      const image = await this._service.getOne(imageId);

      if (!image) {
        return res.sendStatus(404);
      }

      res.set("Content-Type", image.contentType);
      res.set("Content-Length", `${image.size}`);
      res.set(
        "Content-Disposition",
        `inline; filename*=UTF-8''${encodeURIComponent(image.fileName)}`
      );

      return res.sendFile(cwd() + `/${image.path}`);
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const file = req.file;

    if (!file) {
      return res.sendStatus(404);
    }

    const { originalname, path, size, mimetype } = file;

    try {
      const image = await this._service.create({
        fileName: originalname,
        size,
        contentType: mimetype,
        path,
      });

      res.status(201).json({ image });
    } catch (e) {
      return next(e);
    }
  };
}
