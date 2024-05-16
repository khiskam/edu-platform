import { UserRole } from "../types";

export type User = {
  auth?: {
    token: string;
    role: UserRole;
  };
};
