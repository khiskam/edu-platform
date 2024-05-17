import { RequestHandler } from "express";
import { Router } from "express";
import { Handler, handleError } from "../handler";
import { UserService } from "@services/user/service";
import { UserRepository } from "@infrastructure/repository/user";
import { prisma } from "@app/config/db";

export class UserHandler implements Handler {
  private readonly _path = "/users";
  private _router: Router;
  private _service: UserService;

  constructor() {
    this._router = Router();

    const repo = new UserRepository(prisma);
    this._service = new UserService(repo);

    this.initRoutes();
  }

  private handleRegister: RequestHandler = async (_, res) => {
    const user = await this._service.register({ uid: res.locals.uid });

    return res.status(200).json({ user: user });
  };

  private handleLogin: RequestHandler = async (req, res) => {
    const user = await this._service.getUserByUid(res.locals.uid);

    if (!user) {
      return res.sendStatus(401);
    }

    return res.status(200).json({ user: user });
  };

  private initRoutes = () => {
    this._router.post("/signin", handleError(this.handleLogin));
    this._router.post("/signup", handleError(this.handleRegister));
    this._router.get("/check", handleError(this.handleLogin));
  };

  get router() {
    return this._router;
  }

  get path() {
    return this._path;
  }
}
