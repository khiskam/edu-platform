import { RequestHandler } from "express";
import { Router } from "express";
import { prisma } from "@app/config/db";
import { CategoryRepository } from "@repository/category";
import { CategoryService } from "@services/category";
import { parseLimit, parsePage } from "./utils";
import { validateMiddleware } from "@app/middleware/validate";
import { categorySchema } from "./validation";
import { AdminHandler, Handler } from "./interfaces";

export class CategoryHandler implements Handler, AdminHandler {
  private readonly _path = "/categories";
  private _service: CategoryService;

  constructor() {
    const repo = new CategoryRepository(prisma);
    this._service = new CategoryService(repo);
  }

  public initRoutes = (): Router => {
    const router = Router();

    router.get("/", this.getAllWithProgress);
    router.get("/:id", this.getOneWithProgress);
    router.get("/:id/lessons", this.getAllLessonsByCategoryIdWithProgress);

    return router;
  };

  public initAdminRoutes = () => {
    const router = Router();

    router.get("/", this.getAll);
    router.get("/:id", this.getOne);
    router.get("/:id/lessons", this.getAllLessonsByCategoryId);

    router.post("/", validateMiddleware(categorySchema), this.create);
    router.put("/:id", validateMiddleware(categorySchema), this.update);
    router.delete("/:id", this.delete);

    return router;
  };

  get path() {
    return this._path;
  }

  private getAll: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;

    try {
      const categories = await this._service.getAll(parseLimit(limit), parsePage(page));

      return res.status(200).json(categories);
    } catch (e) {
      return next(e);
    }
  };

  private getAllWithProgress: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;
    const userId = res.locals.id;

    try {
      const categories = await this._service.getAllWithProgress(
        userId,
        parseLimit(limit),
        parsePage(page)
      );

      return res.status(200).json(categories);
    } catch (e) {
      return next(e);
    }
  };

  private getAllLessonsByCategoryId: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;
    const { id: categoryId } = req.params;

    try {
      const lessons = await this._service.getAllLessonsByCategoryId(
        categoryId,
        parseLimit(limit),
        parsePage(page)
      );

      return res.status(200).json(lessons);
    } catch (e) {
      return next(e);
    }
  };

  private getAllLessonsByCategoryIdWithProgress: RequestHandler = async (req, res, next) => {
    const { limit, page } = req.query;
    const { id: categoryId } = req.params;
    const userId = res.locals.id;

    try {
      const lessons = await this._service.getAllLessonsByCategoryIdWithProgress(
        categoryId,
        userId,
        parseLimit(limit),
        parsePage(page)
      );

      console.log(lessons);

      return res.status(200).json(lessons);
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

  private getOneWithProgress: RequestHandler = async (req, res, next) => {
    const { id: categoryId } = req.params;
    const userId = res.locals.id;

    try {
      const category = await this._service.getOneWithProgress(categoryId, userId);

      if (!category) {
        return res.sendStatus(404);
      }

      return res.status(200).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private create: RequestHandler = async (req, res, next) => {
    const { name } = req.body;

    try {
      const category = await this._service.create({ name });

      return res.status(201).json({ category });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
      const category = await this._service.update({ id, name });

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
}
