import { MontlyUnitProgress, User } from "@domain/user";

export type CreateUserDTO = Omit<User, "id" | "role">;
export type UpdateUserDTO = Omit<User, "id" | "role">;

export interface IUserRepository {
  getAll(limit: number, offset: number, search?: string): Promise<User[]>;
  getByUid(uid: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;

  create(user: CreateUserDTO): Promise<User>;
  update(user: UpdateUserDTO): Promise<User>;

  getTotalCount(search?: string): Promise<number>;
}

export interface IUserStatisticsRepository {
  getOneMontlyProgress(userId: string): Promise<MontlyUnitProgress>;
  getOneCompletedLessons(userId: string): Promise<number>;
  getOneCompletedTasks(userId: string): Promise<number>;
}
