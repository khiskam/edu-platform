import { UserRole } from "@/shared/types";

export type ProfileDataProps = {
  data: { firstName: string; lastName: string; role: UserRole; email?: string };
};
