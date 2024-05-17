import { Prisma, PrismaClient } from "@prisma/client";

import { ClientError } from "@services/utils/client.error";
import { PRISMA_CODES } from "./constants";
import { ILessonRepository } from "@services/lesson/interfaces";
import { Lesson, LessonKeys } from "@domain/lesson";
import { LessonDTO } from "@services/lesson/dto";

export class LessonRepository implements ILessonRepository {
  constructor(private readonly _client: PrismaClient) {}
  async count(): Promise<number> {
    return await this._client.lesson.count();
  }

  async getAll(limit: number, offset: number): Promise<Lesson[]> {
    return await this._client.lesson.findMany({
      skip: offset,
      take: limit,
      include: { completedLesson: true },
    });
  }

  async getOne(id: string): Promise<Lesson | null> {
    return await this._client.lesson.findFirst({
      where: { id },
      include: { completedLesson: true },
    });
  }

  async create(lesson: LessonDTO): Promise<Lesson> {
    return await this._client.lesson.create({ data: lesson });
  }

  async update(lesson: Lesson): Promise<Lesson> {
    const { id, title, description, layout, categoryId } = lesson;
    return await this._client.lesson.update({
      where: { id },
      data: { title, description, layout, categoryId },
    });
  }

  async delete(id: string): Promise<void> {
    try {
      await this._client.lesson.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === PRISMA_CODES.notFound) {
          throw new ClientError<LessonKeys>("Занятие не найдено", 404, "id");
        }
      }

      throw e;
    }
  }
}
