import { ROUTES } from "@/shared";

export const toLessonPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.lessons}/${id}`;
};
