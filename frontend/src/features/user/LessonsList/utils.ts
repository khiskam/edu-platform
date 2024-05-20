import { ROUTES } from "@/shared/routes";

export const toLessonPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.lessons}/${id}`;
};
