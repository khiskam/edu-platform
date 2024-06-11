import { RequestHandler } from "express";
import { Router } from "express";

import { Handler } from "../interfaces";

export class HealthCheckHandler implements Handler {
  private readonly _path = "/healthcheck";

  constructor() {}

  get path() {
    return this._path;
  }

  public getRouter = (): Router => {
    const router = Router();

    router.get("/", this.healthCheck);

    return router;
  };

  private healthCheck: RequestHandler = (req, res) => {
    res.json({
      message: `Server is running on: ${req.protocol}://${req.get("host")}`,
    });
  };
}
