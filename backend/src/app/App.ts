import express, { Application, json, Request, Response, Router } from "express";
import cors from "cors";
import { Handler } from "./handlers/handler";
import { errorMiddleware } from "./middleware/error";
import { ENV } from "../config";
import { authMiddleware, tokenMiddleware } from "./middleware/auth";

export class App {
  private _express: Application;
  private _router: Router;
  private _port: number;

  constructor(port: number) {
    this._express = express();
    this._port = port;

    this.healthCheck();
    this._express.use(cors({ origin: ENV.CLIENT_ORIGIN }));
    this._express.use(json());

    this._router = Router();

    this._router.use(tokenMiddleware());
  }

  private initHandlers = (handlers: Handler[]) => {
    handlers.forEach((handler) => {
      this._router.use(handler.path, handler.router);
    });
  };

  public listen() {
    this._express.use("/api", this._router);
    this._express.use(errorMiddleware);

    this._express.listen(this._port, () => {
      console.log(`listening on the port: ${this._port}`);
    });
  }

  public addRoutes(...handlers: Handler[]) {
    this.initHandlers(handlers);
  }

  public addAuthMiddleware() {
    this._router.use(authMiddleware());
  }

  private healthCheck() {
    this._express.get("/health-check", (req: Request, res: Response) => {
      res.json({
        message: `Server is running on: ${req.protocol}://${req.get("host")}`,
      });
    });
  }
}
