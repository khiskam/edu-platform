export type Task = {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  answers: string[];
  correctAnswers: string[];
};

export type TaskKeys = keyof Task;

export type CompletedTask = {
  userId: string;
  taskId: string;
};

export type CompletedTaskWithAnswer = CompletedTask & { answers: string[] };

export type CompletedTaskKeys = "userIdTaskId";
