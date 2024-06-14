import { prisma } from "@app/config/db";
import { adminMiddleware, authMiddleware, tokenMiddleware } from "@app/middleware/auth";
import { validateMiddleware } from "@app/middleware/validate";
import { TaskRepository } from "@repository/TaskRepository";
import { TaskService } from "@services/task/TaskService";
import { RequestHandler } from "express";
import { Router } from "express";

import { Handler } from "../interfaces";
import { createTaskSchema, taskSchema } from "./validation";

export class TaskHandler implements Handler {
  private readonly _path = "/tasks";
  private _service: TaskService;

  constructor() {
    const repo = new TaskRepository(prisma);
    this._service = new TaskService(repo);
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

    router.get("/:id", this.getOneProgress);
    router.post("/:id", validateMiddleware(createTaskSchema), this.createCompleted);

    return router;
  }

  getAdminRouter(): Router {
    const router = Router();
    router.use(adminMiddleware());

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

  private getOneProgress: RequestHandler = async (req, res, next) => {
    const { id: taskId } = req.params;
    const userId = res.locals.id;

    try {
      const task = await this._service.getOneProgress(taskId, userId);

      if (!task) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const { title, description, lessonId, answers, correctAnswers } = req.body;

    try {
      const task = await this._service.create({
        title,
        description,
        lessonId,
        answers,
        correctAnswers,
      });

      return res.status(201).json({ task });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { title, description, lessonId, answers, correctAnswers } = req.body;
    const { id } = req.params;

    try {
      const task = await this._service.update({
        id,
        title,
        description,
        lessonId,
        answers,
        correctAnswers,
      });

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
