import { ILessonRepository } from "./interfaces";
import { LessonDTO } from "./dto";
import { CompletedLesson, Lesson } from "@domain/lesson";

export class LessonService {
  constructor(private readonly _repo: ILessonRepository) {}

  async getAll(limit: number, page: number) {
    const offset = (page - 1) * limit;
    const lessons = await this._repo.getAll(limit, offset);
    const totalCount = await this._repo.count();

    return { lessons, totalCount };
  }

  async getOne(id: string) {
    return await this._repo.getOne(id);
  }

  async getOneCompleted(data: CompletedLesson) {
    return await this._repo.getOneCompleted(data);
  }

  async create(lesson: LessonDTO) {
    lesson.title = lesson.title.trim();
    lesson.description = lesson.description.trim();

    return await this._repo.create(lesson);
  }

  async update(lesson: Lesson) {
    lesson.title = lesson.title.trim();
    lesson.description = lesson.description.trim();

    return await this._repo.update(lesson);
  }

  async delete(id: string) {
    return await this._repo.delete(id);
  }

  async completedCreate(data: CompletedLesson) {
    return await this._repo.createCompleted(data);
  }

  async completedDelete(data: CompletedLesson) {
    return await this._repo.deleteCompleted(data);
  }

  async getProgress(userId: string, limit: number, page: number) {
    const offset = (page - 1) * limit;
    const lessons = await this._repo.getProgress(userId, limit, offset);
    const totalCount = await this._repo.count();

    return { lessons, totalCount };
  }
}
