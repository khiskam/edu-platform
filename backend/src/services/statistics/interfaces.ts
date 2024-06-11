export type Statistics = {
  usersCount: number;
  categoriesCount: number;
  lessonsCount: number;
  tasksCount: number;
};

export interface IStatisticsRepository {
  getStatistics(): Promise<Statistics>;
}
