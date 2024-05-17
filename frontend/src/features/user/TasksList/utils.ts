import { ROUTES } from "@/shared";

export const toTaskPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.tasks}/${id}`;
};
