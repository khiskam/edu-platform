import { Category } from "@domain/category";

export type CategoryDTO = Omit<Category, "id">;

export type Progress = {
  id: string;
  name: string;
  completedCount: number;
  totalCount: number;
};
