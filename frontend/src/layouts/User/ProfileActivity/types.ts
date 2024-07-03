import { TrackerProps } from "@/components";

export type ProfileActivityProps = {
  data: {
    monthlyActions: TrackerProps["data"];
    statistics: { lessonsCompleted: number; tasksCompleted: number };
  };
};

export type Progress = Pick<TrackerProps["data"][number], "lessonsCompleted" | "tasksCompleted">;
