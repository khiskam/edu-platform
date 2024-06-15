import { Theme } from "@emotion/react";

import { COLORS } from "@/shared/theme/constants";

import { TrackerItemProps, TrackerProps } from "./types";

export const getType = (data: TrackerProps["data"][number]): TrackerItemProps["type"] => {
  const total = data.lessonsCompleted + data.tasksCompleted;
  if (total === 0) {
    return "0";
  } else if (total === 1) {
    return "1";
  } else if (total === 2) {
    return "2";
  } else if (total === 3) {
    return "3";
  } else if (total === 4) {
    return "4";
  } else {
    return "5";
  }
};

export const colorByType = (type: TrackerItemProps["type"], theme: Theme) => {
  return type === "gray"
    ? COLORS.bg
    : type === "0"
    ? theme.blue1
    : type === "1"
    ? theme.blue2
    : type === "2"
    ? theme.blue3
    : type === "3"
    ? theme.blue4
    : type === "4"
    ? theme.blue5
    : type === "5"
    ? theme.blue6
    : theme.colorWhite;
};

export const isTooltip = (date: string) => {
  return new Date(date).getDate() <= new Date().getDate();
};
