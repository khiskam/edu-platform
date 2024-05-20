import { ROUTES } from "@/shared/routes";

export const toCategoryPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.categories}/${id}`;
};
