import { Category, Image, Lesson } from "@/shared/types";

export type CategoriesResponse = {
  categories: Category[];
  totalCount: number;
};

export type CategoryResponse = {
  category: Category;
};

export type LessonsResponse = {
  lessons: Lesson[];
  totalCount: number;
};

export type LessonResponse = {
  lesson: Lesson;
};

export type ImageResponse = {
  image: Image;
};
