import { Category } from "@/shared";
import { CategoryData } from "@/shared";

export const categoryToCategoryData = (data: Category): CategoryData => {
  return { name: data.name };
};
