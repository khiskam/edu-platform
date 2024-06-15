import { TrackerProps } from "@/components";

export type ProfileActivityProps = {
  data: {
    monthlyActions: TrackerProps["data"];
    statistics: { lessonsCompleted: number; tasksCompleted: number };
  };
};
