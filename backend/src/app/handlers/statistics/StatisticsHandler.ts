import { prisma } from "@app/config/db";
import { StatisticsRepository } from "@repository/StatisticsRepository";
import { StatisticsService } from "@services/statistics/StatisticsService";
import { RequestHandler } from "express";
import { Router } from "express";

import { Handler } from "../interfaces";

export class StatisticsHandler implements Handler {
  private readonly _path = "/statistics";
  private _service: StatisticsService;

  constructor() {
    const repo = new StatisticsRepository(prisma);
    this._service = new StatisticsService(repo);
  }

  public getRouter = (): Router => {
    const router = Router();

    router.get("/", this.getStatistics);

    return router;
  };

  get path() {
    return this._path;
  }

  private getStatistics: RequestHandler = async (_, res, next) => {
    try {
      const statistics = await this._service.getStatistics();

      return res.status(200).json({ statistics });
    } catch (e) {
      return next(e);
    }
  };
}
