import { ROUTES } from "@/shared";

export const toCategoryPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.categories}/${id}`;
};
