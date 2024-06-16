import { TaskProgress } from "@/shared/api/task/types";
import { CompletedAnswerData } from "@/shared/types";

export type TaskProps = {
  data: TaskProgress;
  onSubmit: (id: string, reset: () => void) => (data: CompletedAnswerData) => void;
};
