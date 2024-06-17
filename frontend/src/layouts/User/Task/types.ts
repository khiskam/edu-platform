import { TaskProgress } from "@/shared/api/task/types";
import { AnswerData } from "@/shared/types";

export type TaskProps = {
  data: TaskProgress;
  onSubmit: (id: string, reset: () => void) => (data: AnswerData) => void;
};
