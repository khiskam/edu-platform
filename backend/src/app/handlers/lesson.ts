import { RequestHandler, Router } from "express";
import { prisma } from "@app/config/db";
import { parseLimit, parsePage } from "./utils";
import { validateMiddleware } from "@app/middleware/validate";
import { lessonSchema } from "./validation";
import { LessonService } from "@services/lesson";
import { LessonRepository } from "@repository/lesson";
import { AdminHandler, Handler } from "./interfaces";

export class LessonHandler implements Handler, AdminHandler {
  private readonly _path = "/lessons";
  private _service: LessonService;

  constructor() {
    const repo = new LessonRepository(prisma);
    this._service = new LessonService(repo);
  }

  public initRoutes = () => {
    const router = Router();

    router.get("/:id/tasks", this.getAllTasksByLessonIdWithProgress);
    router.get("/:id", this.getOneWithProgress);

    router.post("/:id", this.createCompleted);

    return router;
  };

  initAdminRoutes(): Router {
    const router = Router();

    router.get("/:id", this.getOne);
    router.get("/:id/tasks", this.getAllTasksByLessonId);

    router.post("/", validateMiddleware(lessonSchema), this.create);
    router.put("/:id", validateMiddleware(lessonSchema), this.update);
    router.delete("/:id", this.delete);

    return router;
  }

  get path() {
    return this._path;
  }

  private getAllTasksByLessonId: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;
    const { id: lessonId } = req.params;

    try {
      const lessons = await this._service.getAllTasksByLessonId(
        lessonId,
        parseLimit(limit),
        parsePage(page)
      );

      return res.status(200).json(lessons);
    } catch (e) {
      return next(e);
    }
  };

  private getAllTasksByLessonIdWithProgress: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;
    const { id: lessonId } = req.params;
    const userId = res.locals.id;

    try {
      const lessons = await this._service.getAllTasksByLessonIdWithProgress(
        lessonId,
        userId,
        parseLimit(limit),
        parsePage(page)
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

  private getOneWithProgress: RequestHandler = async (req, res, next) => {
    const { id: lessonId } = req.params;
    const userId = res.locals.id;

    try {
      const lesson = await this._service.getOneWithProgress(lessonId, userId);

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
