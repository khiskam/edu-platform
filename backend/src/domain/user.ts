export type User = {
  id: string;
  uid: string;

  firstName: string;
  lastName: string;

  role: "user" | "admin";
};

export type UnitProgress = {
  lessonsCompleted: number;
  tasksCompleted: number;
};

export type MontlyUnitProgress = { date: string } & UnitProgress;

export type UserDetails = User & { email?: string } & {
  statistics: UnitProgress;
  monthlyActions: MontlyUnitProgress;
};
