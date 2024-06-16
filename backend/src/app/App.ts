import cors from "cors";
import express, { Express, json, Router } from "express";

import { Handler } from "./handlers/interfaces";
import { errorMiddleware } from "./middleware/error";

export class App {
  private _express: Express;
  private _router: Router;
  private _port: number;

  constructor(port: number, ...handlers: Handler[]) {
    this._express = express();
    this._port = port;

    this._express.use(cors());
    this._express.use(json());

    this._router = Router();

    this.initHandlers(handlers);
  }

  private initHandlers(handlers: Handler[]) {
    handlers.forEach((handler) => {
      this._router.use(handler.path, handler.getRouter());
    });
  }

  public listen() {
    this._express.use("/api", this._router);

    this._express.use(errorMiddleware);

    this._express.listen(this._port, () => {
      console.log(`listening on the port: ${this._port}`);
    });
  }
}
