import { User } from "@/shared/types";

export type UserResponse = { user: User };

export type UserDetailsResponse = {
  user: User & {
    statistics: { lessonsCompleted: number; tasksCompleted: number };
  } & { monthlyActions: { date: string; lessonsCompleted: number; tasksCompleted: number }[] };
};
