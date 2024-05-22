import { TaskWithProgress } from "@/shared/api";
import { AnswerData } from "@/shared/types";

export type TaskProps = {
  data: TaskWithProgress;
  onSubmit: (id: string, reset: () => void) => (data: AnswerData) => void;
};
