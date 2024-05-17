import { Task } from "@domain/task";
import { Values } from "./utils";

export type TaskDTO = Omit<Task, "id">;

export type MutationDTO = Omit<Task, "id" | "answers" | "correctAnswers"> & Values;
export type MutationDTOWithId = Omit<Task, "id" | "answers" | "correctAnswers"> &
  Values & { id: string };
