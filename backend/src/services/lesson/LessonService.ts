import { Lesson } from "@domain/lesson";

import {
  CreateCompletedLessonDTO,
  ICompletedLessonRepository,
  ILessonProgressRepository,
  ILessonRepository,
  ITasksByLessonRepository,
  LessonData,
} from "./interfaces";
import { getImageIdsFromLayout } from "./utils";

export class LessonService {
  constructor(
    private readonly _repo: ILessonRepository &
      ILessonProgressRepository &
      ITasksByLessonRepository &
      ICompletedLessonRepository
  ) {}

  async getAllTasks(lessonId: string, limit: number, page: number, search?: string) {
    const offset = (page - 1) * limit;
    const tasks = await this._repo.getAllTasks(lessonId, limit, offset, search);
    const totalCount = await this._repo.getTasksCount(lessonId, search);

    return { tasks, totalCount };
  }

  async getAllTasksProgress(
    lessonId: string,
    userId: string,
    limit: number,
    page: number,
    search?: string
  ) {
    const offset = (page - 1) * limit;
    const tasks = await this._repo.getAllTasksProgress(lessonId, userId, limit, offset, search);
    const totalCount = await this._repo.getTasksCount(lessonId, search);

    return { tasks, totalCount };
  }

  async getOne(lessonId: string) {
    return await this._repo.getOne(lessonId);
  }

  async getOneProgress(lessonId: string, userId: string) {
    return await this._repo.getOneProgress(lessonId, userId);
  }

  async create(lesson: LessonData) {
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
    await this._repo.deleteAllCompleted(lesson.id);

    return updatedLesson;
  }

  async delete(lessonId: string) {
    return await this._repo.delete(lessonId);
  }

  async createCompleted(data: CreateCompletedLessonDTO) {
    return await this._repo.createCompleted(data);
  }
}
