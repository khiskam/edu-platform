import { ILessonRepository } from "@repository/interfaces";
import { CompletedLesson, Lesson } from "@domain/lesson";
import { CreateLesson, getImageIdsFromLayout } from "./utils";

export class LessonService {
  constructor(private readonly _repo: ILessonRepository) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const lessons = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();

    return { lessons, totalCount };
  }

  async getAllTasksByLessonIdWithProgress(
    lessonId: string,
    userId: string,
    limit: number,
    page: number
  ) {
    const offset = (page - 1) * limit;
    const tasks = await this._repo.getAllTasksByLessonIdWithProgress(
      lessonId,
      userId,
      limit,
      offset
    );
    const totalCount = await this._repo.tasksCountByLessonId(lessonId);

    return { tasks, totalCount };
  }

  async getOne(lessonId: string) {
    return await this._repo.getOne(lessonId);
  }

  async getOneWithProgress(lessonId: string, userId: string) {
    return await this._repo.getOneWithProgress(lessonId, userId);
  }

  async create(lesson: CreateLesson) {
    lesson.title = lesson.title.trim();
    lesson.description = lesson.description.trim();

    const images = getImageIdsFromLayout(lesson.layout);

    return await this._repo.create({ ...lesson, images });
  }

  async update(lesson: Lesson) {
    lesson.title = lesson.title.trim();
    lesson.description = lesson.description.trim();

    const images = getImageIdsFromLayout(lesson.layout);

    const updatedLesson = await this._repo.update({ ...lesson, images });
    await this._repo.deleteCompletedLessonsByLessonId(lesson.id);

    return updatedLesson;
  }

  async delete(lessonId: string) {
    return await this._repo.delete(lessonId);
  }

  async createCompleted(data: CompletedLesson) {
    return await this._repo.createCompleted(data);
  }
}
