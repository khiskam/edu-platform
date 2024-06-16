import { app } from "@app/config/auth";
import { User, UserDetails } from "@domain/user";

import {
  CreateUserDTO,
  IUserRepository,
  IUserStatisticsRepository,
  UpdateUserDTO,
} from "./interfaces";

export class UserService {
  constructor(private readonly _repo: IUserRepository & IUserStatisticsRepository) {}

  async create(user: CreateUserDTO) {
    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();

    return this._repo.create(user);
  }

  async update(user: UpdateUserDTO) {
    user.firstName = user.firstName.trim();
    user.lastName = user.lastName.trim();

    return this._repo.update(user);
  }

  async getUserByUid(uid: string) {
    const user = await this._repo.getByUid(uid);

    if (!user) {
      app.auth().deleteUser(uid);
      return null;
    }

    return user;
  }

  async getOneDetails(userId: string): Promise<UserDetails | null> {
    const user = await this._repo.getById(userId);

    if (!user) {
      return null;
    }

    const lessonsCompleted = await this._repo.getOneCompletedLessons(user.id);
    const tasksCompleted = await this._repo.getOneCompletedLessons(user.id);
    const monthlyActions = await this._repo.getOneMontlyProgress(user.id);

    return {
      id: user.id,
      uid: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      email: (await app.auth().getUser(user.uid)).email,
      statistics: { lessonsCompleted, tasksCompleted },
      monthlyActions,
    };
  }

  async getAll(limit: number, page: number, search?: string) {
    const offset = (page - 1) * limit;

    const users = await this._repo.getAll(limit, offset, search);

    const data: (User & { email?: string })[] = [];

    for (const user of users) {
      data.push({ ...user, email: (await app.auth().getUser(user.uid)).email });
    }

    const count = await this._repo.getTotalCount(search);

    return { users: data, total: count };
  }
}
