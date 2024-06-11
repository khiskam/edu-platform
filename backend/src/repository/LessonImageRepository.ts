import { LessonImage } from "@domain/lesson";
import { PrismaClient } from "@prisma/client";
import { CreateImageDTO, ILessonImageRepository } from "@services/lessonImage/interfaces";

export class LessonImageRepository implements ILessonImageRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getOne(imageId: string): Promise<LessonImage | null> {
    return await this._client.lessonImage.findFirst({ where: { id: imageId } });
  }

  async create(image: CreateImageDTO): Promise<LessonImage> {
    return await this._client.lessonImage.create({ data: image });
  }
}
