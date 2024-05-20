import { IImageRepository, CreateImageDTO } from "@repository/interfaces";
import { Image } from "@domain/image";

export class ImageService {
  constructor(private readonly _repo: IImageRepository) {}

  async getOne(imageId: string): Promise<Image | null> {
    return await this._repo.getOne(imageId);
  }

  async create(image: CreateImageDTO): Promise<Image> {
    return await this._repo.create(image);
  }
}
