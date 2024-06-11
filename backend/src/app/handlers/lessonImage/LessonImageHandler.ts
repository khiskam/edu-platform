import { prisma } from "@app/config/db";
import { adminMiddleware } from "@app/middleware/auth";
import { LessonImageRepository } from "@repository/LessonImageRepository";
import { LessonImageService } from "@services/lessonImage/LessonImageService";
import { RequestHandler, Router } from "express";
import { cwd } from "process";

import { Handler } from "../interfaces";
import { upload } from "./utils";

// import { ClientError } from "@services/error";

export class LessonImageHandler implements Handler {
  private readonly _path = "/images";
  private _service: LessonImageService;

  constructor() {
    const repo = new LessonImageRepository(prisma);
    this._service = new LessonImageService(repo);
  }

  public getRouter = (): Router => {
    const router = Router();

    router.use("/admin", this.getAdminRouter());

    return router;
  };

  public getAdminRouter = (): Router => {
    const router = Router();

    router.use(adminMiddleware());

    router.get("/:id", this.getOne);
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
