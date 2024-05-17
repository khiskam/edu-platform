import { Category } from "@domain/category";

export type CategoryDTO = Omit<Category, "id">;
