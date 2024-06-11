import { IStatisticsRepository, Statistics } from "./interfaces";

export class StatisticsService {
  constructor(private readonly _repo: IStatisticsRepository) {}

  async getStatistics(): Promise<Statistics> {
    return await this._repo.getStatistics();
  }
}
