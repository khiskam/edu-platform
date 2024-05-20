import { Image } from "@domain/image";
import { PrismaClient } from "@prisma/client";

import { CreateImageDTO, IImageRepository } from "@repository/interfaces";

export class ImageRepository implements IImageRepository {
  constructor(private readonly _client: PrismaClient) {}

  async getOne(imageId: string): Promise<Image | null> {
    return await this._client.image.findFirst({ where: { id: imageId } });
  }

  async create(image: CreateImageDTO): Promise<Image> {
    return await this._client.image.create({ data: image });
  }
}
