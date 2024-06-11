import { LessonImage } from "@domain/lesson";

export type CreateImageDTO = Omit<LessonImage, "id" | "lessonId">;

export interface ILessonImageRepository {
  getOne(imageId: string): Promise<LessonImage | null>;
  create(image: CreateImageDTO): Promise<LessonImage>;
}
