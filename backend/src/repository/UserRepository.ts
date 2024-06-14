import { MontlyUnitProgress, User } from "@domain/user";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateUserDTO,
  IUserRepository,
  IUserStatisticsRepository,
  UpdateUserDTO,
} from "@services/user/interfaces";

import { PRISMA_CODES } from "./constants";
import { DatabaseError } from "./DatabaseError";

type UserKeys = keyof User;

export class UserRepository implements IUserRepository, IUserStatisticsRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getTotalCount(search?: string): Promise<number> {
    if (!search) {
      return await this._client.user.count({
        where: { role: "user" },
      });
    }

    return await this._client.user.count({
      where: {
        role: "user",
        OR: [
          { firstName: { startsWith: search, mode: "insensitive" } },
          { lastName: { startsWith: search, mode: "insensitive" } },
        ],
      },
    });
  }

  async getAll(limit: number, offset: number, search?: string): Promise<User[]> {
    if (!search) {
      return await this._client.user.findMany({
        where: { role: "user" },
      });
    }

    return await this._client.user.findMany({
      take: limit,
      skip: offset,
      where: {
        role: "user",
        OR: [
          { firstName: { startsWith: search, mode: "insensitive" } },
          { lastName: { startsWith: search, mode: "insensitive" } },
        ],
      },
    });
  }

  async create(user: CreateUserDTO): Promise<User> {
    try {
      return await this._client.user.create({
        data: user,
        select: { id: true, uid: true, role: true, firstName: true, lastName: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.unique) {
          throw new DatabaseError<UserKeys>(
            "Пользователь c таким uid уже существует",
            "client",
            "uid"
          );
        }
      }

      throw e;
    }
  }

  async update(user: UpdateUserDTO): Promise<User> {
    try {
      return await this._client.user.update({
        where: { uid: user.uid },
        data: { uid: user.uid, firstName: user.firstName, lastName: user.lastName },
        select: { id: true, uid: true, role: true, firstName: true, lastName: true },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new DatabaseError<UserKeys>("Пользователь не найден", "notFound", "uid");
        }
      }

      throw e;
    }
  }

  async getByUid(uid: string): Promise<User | null> {
    return this._client.user.findFirst({
      where: { uid },
      select: { id: true, uid: true, role: true, firstName: true, lastName: true },
    });
  }

  getById(id: string): Promise<User | null> {
    return this._client.user.findFirst({
      where: { id },
      select: { id: true, uid: true, role: true, firstName: true, lastName: true },
    });
  }

  async getOneMontlyProgress(userId: string): Promise<MontlyUnitProgress> {
    return await this._client.$queryRaw<MontlyUnitProgress>`
  WITH firstDayInMonth AS (
    SELECT DATE_TRUNC('month', CURRENT_DATE)::DATE
  ),
  lastDayInMonth AS (
    SELECT (DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month - 1 day')::DATE
  )
  SELECT
    TO_CHAR(currDate, 'DD-MM-YYYY') AS "date",
    (
        SELECT COUNT(*)
        FROM public."CompletedLesson"
        WHERE public."CompletedLesson"."completedAt"::DATE = currDate
          AND public."CompletedLesson"."userId" = ${userId}::uuid
    )::INTEGER AS "lessonsCompleted",
    (
        SELECT COUNT(*)
        FROM public."CompletedTask"
        WHERE public."CompletedTask"."completedAt"::DATE = currDate
          AND public."CompletedTask"."userId" = ${userId}::uuid
    )::INTEGER AS "tasksCompleted"
  FROM GENERATE_SERIES(
    (SELECT * FROM firstDayInMonth),
    (SELECT * FROM lastDayInMonth),
    INTERVAL '1 day'
  ) AS currDate;`;
  }

  async getOneCompletedLessons(userId: string): Promise<number> {
    return await this._client.completedLesson.count({
      where: { userId },
    });
  }

  async getOneCompletedTasks(userId: string): Promise<number> {
    return await this._client.completedTask.count({
      where: { userId },
    });
  }
}
