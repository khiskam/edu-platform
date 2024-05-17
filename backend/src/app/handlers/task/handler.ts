import { RequestHandler } from "express";
import { Router } from "express";
import { Handler, handleError } from "../handler";
import { prisma } from "@app/config/db";
import { parseLimit, parsePage } from "../utils";
import { validateMiddleware } from "@app/middleware/validate";
import { TaskService } from "@services/task/service";
import { TaskRepository } from "@infrastructure/repository/task";
import { taskSchema } from "./validation";
import { CompletedTaskRepository } from "@infrastructure/repository/completedTaskRepository";

export class TaskHandler implements Handler {
  private readonly _path = "/tasks";
  private _router: Router;
  private _service: TaskService;

  constructor() {
    this._router = Router();

    const repo = new TaskRepository(prisma);
    const completedRepo = new CompletedTaskRepository(prisma);
    this._service = new TaskService(repo, completedRepo);

    this.initRoutes();
  }

  private handleGetAll: RequestHandler = async (req, res) => {
    const { limit, page } = req.query;
    const tasks = await this._service.getAll(parseLimit(limit), parsePage(page));

    if (!tasks) {
      return res.sendStatus(404);
    }

    return res.status(200).json(tasks);
  };

  private handleGetOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const task = await this._service.getOne(id);

    if (!task) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ task });
  };

  private handleCreate: RequestHandler = async (req, res) => {
    const { title, description, lessonId, answers } = req.body;
    const task = await this._service.create({ title, description, lessonId, answers });

    return res.status(200).json({ task });
  };

  private handleUpdate: RequestHandler = async (req, res) => {
    const { title, description, lessonId, answers } = req.body;
    const { id } = req.params;
    const task = await this._service.update({ id, title, description, lessonId, answers });

    return res.status(200).json({ task });
  };

  private handleDelete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const task = await this._service.delete(id);

    return res.status(200).json({ task });
  };

  private handleCompletedCreate: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const lesson = await this._service.completedCreate({ taskId: id, userId: res.locals.id });

    return res.status(200).json({ lesson });
  };

  private handleCompletedDelete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const lesson = await this._service.completedDelete({ taskId: id, userId: res.locals.id });

    return res.status(200).json({ lesson });
  };

  private initRoutes = () => {
    this._router.get("/", handleError(this.handleGetAll));
    this._router.post("/", validateMiddleware(taskSchema), handleError(this.handleCreate));
    this._router.get("/:id", handleError(this.handleGetOne));
    this._router.put("/:id", validateMiddleware(taskSchema), handleError(this.handleUpdate));
    this._router.delete("/:id", handleError(this.handleDelete));
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
