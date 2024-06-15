import { Category } from "@/shared/types";

export type CategoriesResponse = {
  categories: Category[];
  totalCount: number;
};

export type CategoryResponse = {
  category: Category;
};

export type CategoryProgress = {
  id: string;
  name: string;
  description: string;
  completedCount: number;
  totalCount: number;
};

export type CategoriesProgressResponse = {
  categories: CategoryProgress[];
  totalCount: number;
};

export type CategoryProgressResponse = {
  category: CategoryProgress;
};
