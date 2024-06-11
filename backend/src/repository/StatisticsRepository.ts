import { PrismaClient } from "@prisma/client";
import { IStatisticsRepository, Statistics } from "@services/statistics/interfaces";

export class StatisticsRepository implements IStatisticsRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getStatistics(): Promise<Statistics> {
    return {
      usersCount: await this._client.user.count({ where: { role: "user" } }),
      categoriesCount: await this._client.category.count(),
      lessonsCount: await this._client.lesson.count(),
      tasksCount: await this._client.task.count(),
    };
  }
}
