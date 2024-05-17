import { RequestHandler } from "express";
import { Router } from "express";
import { Handler, handleError } from "../handler";
import { prisma } from "@app/config/db";
import { CategoryRepository } from "@infrastructure/repository/category";
import { CategoryService } from "@services/category/service";
import { parseLimit, parsePage } from "../utils";
import { validateMiddleware } from "@app/middleware/validate";
import { categorySchema } from "./validation";

// import { authMiddleware } from "@app/middleware/auth";

export class CategoryHandler implements Handler {
  private readonly _path = "/categories";
  private _router: Router;
  private _service: CategoryService;

  constructor() {
    this._router = Router();

    const repo = new CategoryRepository(prisma);
    this._service = new CategoryService(repo);

    this.initRoutes();
  }

  private handleGetAll: RequestHandler = async (req, res) => {
    const { limit, page } = req.query;
    const categories = await this._service.getAll(parseLimit(limit), parsePage(page));

    if (!categories) {
      return res.sendStatus(404);
    }

    return res.status(200).json(categories);
  };

  private handleGetOne: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const category = await this._service.getOne(id);

    if (!category) {
      return res.sendStatus(404);
    }

    return res.status(200).json({ category });
  };

  private handleCreate: RequestHandler = async (req, res) => {
    const { name } = req.body;
    const category = await this._service.create({ name });

    return res.status(200).json({ category });
  };

  private handleUpdate: RequestHandler = async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;
    const category = await this._service.update({ id, name });

    return res.status(200).json({ category });
  };

  private handleDelete: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const category = await this._service.delete(id);

    return res.status(200).json({ category });
  };

  private initRoutes = () => {
    this._router.get("/", handleError(this.handleGetAll));
    this._router.post("/", validateMiddleware(categorySchema), handleError(this.handleCreate));
    this._router.get("/:id", handleError(this.handleGetOne));
    this._router.put("/:id", validateMiddleware(categorySchema), handleError(this.handleUpdate));
    this._router.delete("/:id", handleError(this.handleDelete));
  };

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }
}
