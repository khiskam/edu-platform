import { User } from "@/shared/types";

export type UserResponse = { user: User };

export type UserDetailsResponse = {
  user: User & { email?: string } & {
    statistics: { lessonsCompleted: number; tasksCompleted: number };
  } & { monthlyActions: { date: string; lessonsCompleted: number; tasksCompleted: number }[] };
};

export type UsersResponse = { users: (User & { email: string })[]; totalCount: number };
