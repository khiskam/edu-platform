import { ROUTES } from "@/shared/routes";

export const toTaskPage = (id: string) => {
  return `${ROUTES.profile.path}${ROUTES.tasks}/${id}`;
};
