import { prisma } from "@app/config/db";
import { adminMiddleware, authMiddleware, tokenMiddleware } from "@app/middleware/auth";
import { validateMiddleware } from "@app/middleware/validate";
import { UserRepository } from "@repository/UserRepository";
import { UserService } from "@services/user/UserService";
import { RequestHandler } from "express";
import { Router } from "express";

import { Handler } from "../interfaces";
import { parseLimit, parsePage, parseQ } from "../utils";
import { registerUserSchema, updateUserSchema } from "./validation";

export class UserHandler implements Handler {
  private readonly _path = "/users";
  private _service: UserService;

  constructor() {
    const repo = new UserRepository(prisma);
    this._service = new UserService(repo);
  }

  get path() {
    return this._path;
  }

  public getRouter = (): Router => {
    const router = Router();

    router.use(tokenMiddleware());

    router.post("/signup", validateMiddleware(registerUserSchema), this.signUp);

    router.post("/signin", this.signIn);
    router.get("/check", this.signIn);
    router.use(authMiddleware());
    router.get("/", this.getOneDetails);
    router.put("/", validateMiddleware(updateUserSchema), this.update);

    router.use("/admin", this.getAdminRouter());

    return router;
  };

  getAdminRouter(): Router {
    const router = Router();
    router.use(adminMiddleware());

    router.get("/profiles", this.getAll);
    router.get("/profiles/:userId", this.getUserDetails);

    return router;
  }

  /**
   * @swagger
   * /users/signin:
   *  get:
   *    tags:
   *      - User
   *    description: Sign in
   *    summary: Sign in
   *    security:
   *      - bearerAuth: []
   *    responses:
   *      200:
   *        description: successful operation
   */

  private signIn: RequestHandler = async (_, res, next) => {
    try {
      const user = await this._service.getUserByUid(res.locals.uid);

      if (!user) {
        return res.sendStatus(401);
      }

      return res.status(200).json({ user: user });
    } catch (e) {
      return next(e);
    }
  };

  private signUp: RequestHandler = async (req, res, next) => {
    const { firstName, lastName } = req.body;
    try {
      const user = await this._service.create({ uid: res.locals.uid, firstName, lastName });

      return res.status(201).json({ user: user });
    } catch (e) {
      return next(e);
    }
  };

  private update: RequestHandler = async (req, res, next) => {
    const { firstName, lastName } = req.body;
    const uid = res.locals.uid;

    try {
      const user = await this._service.update({ uid, firstName, lastName });
      return res.status(200).json({ user });
    } catch (e) {
      return next(e);
    }
  };

  private getOneDetails: RequestHandler = async (_, res, next) => {
    const id = res.locals.id;

    try {
      const user = await this._service.getOneDetails(id);
      return res.status(200).json({ user });
    } catch (e) {
      return next(e);
    }
  };

  private getAll: RequestHandler = async (req, res, next) => {
    const { limit, page, q } = req.query;

    try {
      const users = await this._service.getAll(parseLimit(limit), parsePage(page), parseQ(q));
      return res.status(200).json(users);
    } catch (e) {
      return next(e);
    }
  };

  private getUserDetails: RequestHandler = async (req, res, next) => {
    const { userId } = req.params;

    try {
      const user = await this._service.getOneDetails(userId);
      return res.status(200).json({ user });
    } catch (e) {
      return next(e);
    }
  };
}
