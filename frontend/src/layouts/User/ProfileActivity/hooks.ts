import { useMemo } from "react";

import { TrackerProps } from "@/components";

import { Progress } from "./types";

export const useStatistics = (monthlyActions: TrackerProps["data"]) => {
  return useMemo(() => {
    return monthlyActions.reduce(
      (acc: Progress, curr: TrackerProps["data"][number]): Progress => {
        return {
          lessonsCompleted: acc.lessonsCompleted + curr.lessonsCompleted,
          tasksCompleted: acc.tasksCompleted + curr.tasksCompleted,
        };
      },
      { lessonsCompleted: 0, tasksCompleted: 0 }
    );
  }, [monthlyActions]);
};
