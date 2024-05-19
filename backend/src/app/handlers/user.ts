import { RequestHandler } from "express";
import { Router } from "express";
import { Handler } from "./interfaces";
import { UserService } from "@services/user";
import { UserRepository } from "@repository/user";
import { prisma } from "@app/config/db";

export class UserHandler implements Handler {
  private readonly _path = "/users";
  private _service: UserService;

  constructor() {
    const repo = new UserRepository(prisma);
    this._service = new UserService(repo);
  }

  public initRoutes = (): Router => {
    const router = Router();

    router.post("/signin", this.login);
    router.post("/signup", this.register);
    router.get("/check", this.login);

    return router;
  };

  get path() {
    return this._path;
  }

  private register: RequestHandler = async (_, res, next) => {
    try {
      const user = await this._service.register({ uid: res.locals.uid });

      return res.status(200).json({ user: user });
    } catch (e) {
      return next(e);
    }
  };

  private login: RequestHandler = async (_, res, next) => {
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
}
