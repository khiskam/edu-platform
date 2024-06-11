import { prisma } from "@app/config/db";
import { adminMiddleware, authMiddleware, tokenMiddleware } from "@app/middleware/auth";
import { validateMiddleware } from "@app/middleware/validate";
import { CategoryRepository } from "@repository/CategoryRepository";
import { CategoryService } from "@services/category/CategoryService";
import { RequestHandler, Router } from "express";

import { Handler } from "../interfaces";
import { parseLimit, parsePage, parseQ } from "../utils";
import { categorySchema } from "./validation";

export class CategoryHandler implements Handler {
  private readonly _path = "/categories";
  private _service: CategoryService;

  constructor() {
    const repo = new CategoryRepository(prisma);
    this._service = new CategoryService(repo);
  }

  public getRouter = (): Router => {
    const router = Router();

    router.get("/", this.getAll);

    router.use(tokenMiddleware());
    router.use(authMiddleware());

    router.get("/:id", this.getOneProgress);
    router.get("/:id/lessons", this.getAllLessonsProgress);
    router.get("/progress", this.getAllProgress);

    router.use("/admin", this.getAdminRouter());

    return router;
  };

  public getAdminRouter = () => {
    const router = Router();
    router.use(adminMiddleware());

    router.get("/:id", this.getOne);
    router.get("/:id/lessons", this.getAllLessons);
    router.post("/", validateMiddleware(categorySchema), this.create);
    router.put("/:id", validateMiddleware(categorySchema), this.update);
    router.delete("/:id", this.delete);

    return router;
  };

  get path() {
    return this._path;
  }

  private getAll: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;

    try {
      const categories = await this._service.getAll(parseLimit(limit), parsePage(page), parseQ(q));

      return res.status(200).json(categories);
    } catch (e) {
      return next(e);
    }
  };

  private getOne: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await this._service.getOne(id);

      if (!category) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const { name, description } = req.body;

    try {
      const category = await this._service.create({ name, description });

      return res.status(201).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { name, description } = req.body;
    const { id } = req.params;

    try {
      const category = await this._service.update({ id, name, description });

      return res.status(200).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private delete: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
      const category = await this._service.delete(id);

      return res.status(200).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private getAllProgress: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;
    const userId = res.locals.id;

    try {
      const categories = await this._service.getAllProgress(
        userId,
        parseLimit(limit),
        parsePage(page),
        parseQ(q)
      );

      return res.status(200).json(categories);
    } catch (e) {
      return next(e);
    }
  };

  private getAllLessons: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;
    const { id: categoryId } = req.params;

    try {
      const lessons = await this._service.getAllLessons(
        categoryId,
        parseLimit(limit),
        parsePage(page),
        parseQ(q)
      );

      return res.status(200).json(lessons);
    } catch (e) {
      return next(e);
    }
  };

  private getAllLessonsProgress: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;
    const { id: categoryId } = req.params;
    const userId = res.locals.id;

    try {
      const lessons = await this._service.getAllLessonsProgress(
        categoryId,
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

  private getOneProgress: RequestHandler = async (req, res, next) => {
    const { id: categoryId } = req.params;
    const userId = res.locals.id;

    try {
      const category = await this._service.getOneProgress(categoryId, userId);

      if (!category) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ category });
    } catch (e) {
      return next(e);
    }
  };
}
