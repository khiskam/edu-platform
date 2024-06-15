export type TrackerProps = {
  data: { date: string; lessonsCompleted: number; tasksCompleted: number }[];
};

export type TrackerItemProps = {
  type?: "default" | "gray" | "0" | "1" | "2" | "3" | "4" | "5";
};
