import { RequestHandler } from "express";
import { Router } from "express";
import { prisma } from "@app/config/db";
import { validateMiddleware } from "@app/middleware/validate";
import { TaskService } from "@services/task";
import { TaskRepository } from "@repository/task";
import { createTaskSchema, taskSchema } from "./validation";
import { AdminHandler, Handler } from "./interfaces";

export class TaskHandler implements Handler, AdminHandler {
  private readonly _path = "/tasks";
  private _service: TaskService;

  constructor() {
    const repo = new TaskRepository(prisma);
    this._service = new TaskService(repo);
  }

  public initRoutes = () => {
    const router = Router();

    router.get("/:id", this.getOneWithProgress);
    router.post("/:id", validateMiddleware(createTaskSchema), this.createCompleted);

    return router;
  };

  initAdminRoutes(): Router {
    const router = Router();

    router.get("/:id", this.getOne);

    router.post("/", validateMiddleware(taskSchema), this.create);
    router.put("/:id", validateMiddleware(taskSchema), this.update);
    router.delete("/:id", this.delete);

    return router;
  }

  get path() {
    return this._path;
  }

  private getOne: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const task = await this._service.getOne(id);

      if (!task) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private getOneWithProgress: RequestHandler = async (req, res, next) => {
    const { id: taskId } = req.params;
    const userId = res.locals.id;

    try {
      const task = await this._service.getOneWithProgress(taskId, userId);

      if (!task) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const { title, description, lessonId, answers } = req.body;

    try {
      const task = await this._service.create({ title, description, lessonId, answers });

      return res.status(201).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { title, description, lessonId, answers } = req.body;
    const { id } = req.params;

    try {
      const task = await this._service.update({ id, title, description, lessonId, answers });

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private delete: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const task = await this._service.delete(id);

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private createCompleted: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const { answers } = req.body;

    try {
      const task = await this._service.completedCreate({
        taskId: id,
        userId: res.locals.id,
        answers,
      });

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };
}
