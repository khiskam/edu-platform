import { LessonImage } from "@domain/lesson";

import { CreateImageDTO, ILessonImageRepository } from "./interfaces";

export class LessonImageService {
  constructor(private readonly _repo: ILessonImageRepository) {}

  async getOne(imageId: string): Promise<LessonImage | null> {
    return await this._repo.getOne(imageId);
  }

  async create(image: CreateImageDTO): Promise<LessonImage> {
    return await this._repo.create(image);
  }
}
