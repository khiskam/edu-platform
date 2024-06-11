export type Task = {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  answers: string[];
  correctAnswers: string[];
};

export type CompletedTask = {
  userId: string;
  taskId: string;
  completedAt: Date;
};

export type TaskProgress = Pick<Task, "id" | "title" | "answers" | "description"> & {
  isCompleted: boolean;
};
