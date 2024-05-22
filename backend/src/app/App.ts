import express, { Application, json, Router } from "express";
import cors from "cors";
import { AdminHandler, Handler } from "./handlers/interfaces";
import { errorMiddleware } from "./middleware/error";
import { ENV } from "../env";
import { AdminMiddleware, authMiddleware, tokenMiddleware } from "./middleware/auth";

export class App {
  private _express: Application;
  private _router: Router;
  private _port: number;

  constructor(port: number) {
    this._express = express();
    this._port = port;

    this._express.use(cors({ origin: ENV.CLIENT_ORIGIN }));
    this._express.use(json());

    this._router = Router();
  }

  private initHandlers = (handlers: Handler[]) => {
    handlers.forEach((handler) => {
      this._router.use(handler.path, handler.initRoutes());
    });
  };

  private initAdminHandlers = (handlers: AdminHandler[]) => {
    const router = Router();

    handlers.forEach((handler) => {
      router.use(handler.path, handler.initAdminRoutes());
    });

    this._router.use("/admin", router);
  };

  public addTokenMiddleware() {
    this._router.use(tokenMiddleware());
  }

  public addRoutes(...handlers: Handler[]) {
    this.initHandlers(handlers);
  }

  public addAuthRoutes(...handlers: Handler[]) {
    this._router.use(authMiddleware());

    this.initHandlers(handlers);
  }

  public addAdminRoutes(...handlers: AdminHandler[]) {
    this._router.use(AdminMiddleware());
    this.initAdminHandlers(handlers);
  }

  public listen() {
    this._express.use("/api", this._router);
    this._express.use(errorMiddleware);

    this._express.listen(this._port, () => {
      console.log(`listening on the port: ${this._port}`);
    });
  }
}
