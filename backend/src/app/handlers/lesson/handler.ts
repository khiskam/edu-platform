import { RequestHandler } from "express";
import { Router } from "express";
import { Handler, handleError } from "../handler";
import { prisma } from "@app/config/db";
import { parseLimit, parsePage } from "../utils";
import { validateMiddleware } from "@app/middleware/validate";
import { lessonSchema } from "./validation";
import { LessonService } from "@services/lesson/service";
import { LessonRepository } from "@infrastructure/repository/lesson";

export class LessonHandler implements Handler {
  private readonly _path = "/lessons";
  private _router: Router;
  private _service: LessonService;

  constructor() {
    this._router = Router();

    const repo = new LessonRepository(prisma);
    this._service = new LessonService(repo);

    this.initRoutes();
  }

  private handleGetAll: RequestHandler = async (req, res) => {
    const { limit, page } = req.query;
    const lessons = await this._service.getAll(parseLimit(limit), parsePage(page));

    if (!lessons) {
      return res.sendStatus(404);
    }

    return res.status(200).json(lessons);
  };

  private handleGetOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const lesson = await this._service.getOne(id);

    if (!lesson) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ lesson });
  };

  private handleCreate: RequestHandler = async (req, res) => {
    const { title, description, layout, categoryId } = req.body;
    const lesson = await this._service.create({ title, description, layout, categoryId });

    return res.status(200).json({ lesson });
  };

  private handleUpdate: RequestHandler = async (req, res) => {
    const { title, description, layout, categoryId } = req.body;
    const { id } = req.params;
    const lesson = await this._service.update({ id, title, description, layout, categoryId });

    return res.status(200).json({ lesson });
  };

  private handleDelete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const lesson = await this._service.delete(id);

    return res.status(200).json({ lesson });
  };

  private handleCompletedGet: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const lesson = await this._service.getOneCompleted({ lessonId: id, userId: res.locals.id });

    return res.status(200).json({ lesson });
  };

  private handleCompletedCreate: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const lesson = await this._service.completedCreate({ lessonId: id, userId: res.locals.id });

    return res.status(200).json({ lesson });
  };

  private handleCompletedDelete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const lesson = await this._service.completedDelete({ lessonId: id, userId: res.locals.id });

    return res.status(200).json({ lesson });
  };

  private initRoutes = () => {
    this._router.get("/", handleError(this.handleGetAll));
    this._router.post("/", validateMiddleware(lessonSchema), handleError(this.handleCreate));
    this._router.get("/:id", handleError(this.handleGetOne));
    this._router.put("/:id", validateMiddleware(lessonSchema), handleError(this.handleUpdate));
    this._router.delete("/:id", handleError(this.handleDelete));
    this._router.get("/:id/completed", handleError(this.handleCompletedGet));
    this._router.post("/:id/completed", handleError(this.handleCompletedCreate));
    this._router.delete("/:id/completed", handleError(this.handleCompletedDelete));
  };

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }
}
