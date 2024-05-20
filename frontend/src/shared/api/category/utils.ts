import { Category, CategoryData } from "@/shared/types";

export const categoryToCategoryData = (data: Category): CategoryData => {
  return { name: data.name };
};
