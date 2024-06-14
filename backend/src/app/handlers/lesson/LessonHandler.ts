import { prisma } from "@app/config/db";
import { adminMiddleware, authMiddleware, tokenMiddleware } from "@app/middleware/auth";
import { validateMiddleware } from "@app/middleware/validate";
import { LessonRepository } from "@repository/LessonRepository";
import { LessonService } from "@services/lesson/LessonService";
import { RequestHandler, Router } from "express";

import { Handler } from "../interfaces";
import { parseLimit, parsePage, parseQ } from "../utils";
import { lessonSchema } from "./validation";

export class LessonHandler implements Handler {
  private readonly _path = "/lessons";
  private _service: LessonService;

  constructor() {
    const repo = new LessonRepository(prisma);
    this._service = new LessonService(repo);
  }

  public getRouter = () => {
    const router = Router();

    router.use(tokenMiddleware());
    router.use(authMiddleware());

    router.use("/user", this.getUserRouter());
    router.use("/admin", this.getAdminRouter());

    return router;
  };

  getUserRouter(): Router {
    const router = Router();

    router.get("/:id/tasks", this.getAllTasksProgress);
    router.get("/:id", this.getOneProgress);

    router.post("/:id", this.createCompleted);

    return router;
  }

  getAdminRouter(): Router {
    const router = Router();

    router.use(adminMiddleware());

    router.get("/:id", this.getOne);
    router.get("/:id/tasks", this.getAllTasks);

    router.post("/", validateMiddleware(lessonSchema), this.create);
    router.put("/:id", validateMiddleware(lessonSchema), this.update);
    router.delete("/:id", this.delete);

    return router;
  }

  get path() {
    return this._path;
  }

  private getAllTasks: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;
    const { id: lessonId } = req.params;

    try {
      const lessons = await this._service.getAllTasks(
        lessonId,
        parseLimit(limit),
        parsePage(page),
        parseQ(q)
      );

      return res.status(200).json(lessons);
    } catch (e) {
      return next(e);
    }
  };

  private getAllTasksProgress: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;
    const { id: lessonId } = req.params;
    const userId = res.locals.id;

    try {
      const lessons = await this._service.getAllTasksProgress(
        lessonId,
        userId,
        parseLimit(limit),
        parsePage(page),
        parseQ(q)
      );

      return res.status(200).json(lessons);
    } catch (e) {
      return next(e);
    }
  };

  private getOne: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const lesson = await this._service.getOne(id);

      if (!lesson) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };

  private getOneProgress: RequestHandler = async (req, res, next) => {
    const { id: lessonId } = req.params;
    const userId = res.locals.id;

    try {
      const lesson = await this._service.getOneProgress(lessonId, userId);

      if (!lesson) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const { title, description, layout, categoryId } = req.body;

    try {
      const lesson = await this._service.create({ title, description, layout, categoryId });

      return res.status(201).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { title, description, layout, categoryId } = req.body;
    const { id } = req.params;

    try {
      const lesson = await this._service.update({ id, title, description, layout, categoryId });

      return res.status(200).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };

  private delete: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const lesson = await this._service.delete(id);

      return res.status(200).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };

  private createCompleted: RequestHandler = async (req, res, next) => {
    const { id: lessonId } = req.params;
    const userId = res.locals.id;

    try {
      const lesson = await this._service.createCompleted({ lessonId, userId });

      return res.status(200).json({ lesson });
    } catch (e) {
      return next(e);
    }
  };
}
